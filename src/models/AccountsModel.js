import mongoose from 'mongoose'

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"
import Session from '../utils/Session'

import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get'

// Define collection name
const collectionName = "accounts";

// Define collection schema
const Schema = mongoose.Schema;
const AccountsSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    banker_id: { type: Schema.Types.ObjectId, required: true, ref: 'Bankers' },
    parent_id: { type: Schema.Types.ObjectId, ref: collectionName },
    name: { type: String, required: true },
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
AccountsSchema.statics.findDoc = ({ options = {}, fields = null, pageTerms = {}} = {}) => {
    const userInfo = Session.get('user');

    const pagination = {};

    options.status = 'active';
    options.user_id = userInfo.id;

    if (pageTerms.limit !== undefined) pagination.limit = pageTerms.limit;
    if (pageTerms.skip !== undefined) pagination.skip = pageTerms.skip;

    return this.default.find(options, fields, pagination);
};

AccountsSchema.statics.checkExisted = async (options) => {
    if (!options || _isEmpty(options)) return false;

    const userInfo = Session.get('user');

    options.status = 'active';
    options.user_id = userInfo.id;

    const result = await this.default.find(options);

    if (!result || !_get(result, 'data', []).length) return false;

    return true;
};

AccountsSchema.statics.createDoc = formData => {
    const userInfo = Session.get('user');

    formData.status = 'active';
    formData.user_id = userInfo.id;

    return this.default.save(body);
};

AccountsSchema.statics.updateDoc = ({ options, formData }) => {
    const userInfo = Session.get('user');

    options.status = 'active';
    options.user_id = userInfo.id;

    delete formData.status;
    delete formData.name;

    return this.default.findOneAndUpdate(options, formData, { new: true });
};

// Load BaseModel
AccountsSchema.loadClass(BaseModel);
AccountsSchema.plugin(BaseSchema);

// Export Model
export default mongoose.model(collectionName, AccountsSchema, collectionName)