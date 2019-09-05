import mongoose from 'mongoose'

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"
import Session from '../utils/Session'

// Define collection name
const collectionName = "accounts";

// Define collection schema
const Schema = mongoose.Schema;
const AccountsSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    banker_id: { type: Schema.Types.ObjectId, required: true, ref: 'Bankers' },
    parent_id: { type: Schema.Types.ObjectId, ref: collectionName },
    name: String,
    checked: Boolean,
    is_confirm: Boolean,
    is_sub: Boolean,
    sub_user: { type: String, required: true },
    sub_pass: { type: String, required: true },
    sub_code: String,
    sub_login_num: Number,
    sub_locked: Boolean,
    sub_locked_reason: String,
    flag_type: Number,
    data_center_sync: Boolean,
    banker_locked: Boolean,
    banker_locked_reason: String
});

// Defined methods
AccountsSchema.statics.findAll = ({ options = {}, fields = null, pageTerms = {}} = {}) => {
    const userInfo = Session.get('user');
    const pagination = {};

    options.status = 'active';
    options.user_id = userInfo.id;

    if (pageTerms.limit !== undefined) pagination.limit = pageTerms.limit;
    if (pageTerms.skip !== undefined) pagination.skip = pageTerms.skip;

    return this.default.find(options, fields, pagination);
};

AccountsSchema.statics.create = (body) => {
    const userInfo = Session.get('user');

    body.status = 'active';
    body.user_id = userInfo.id;

    return this.default.save(body);
};

// Load BaseModel
AccountsSchema.loadClass(BaseModel);
AccountsSchema.plugin(BaseSchema);

// Export Model
export default mongoose.model(collectionName, AccountsSchema, collectionName)