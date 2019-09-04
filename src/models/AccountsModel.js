import mongoose from 'mongoose'

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"

// Define collection name
const collectionName = "accounts";

// Define collection schema
const AccountsSchema = new mongoose.Schema({
    user_id: ObjectId,
    banker_id: ObjectId,
    parent_id: ObjectId,
    name: String,
    checked: Boolean,
    is_confirm: Boolean,
    is_sub: Boolean,
    sub_user: String,
    sub_pas: Strings,
    sub_code: String,
    sub_login_num: Number,
    sub_locked: Boolean,
    sub_locked_reason: String,
    flag_type: Number,
    data_center_sync: Boolean,
    banker_locked: Boolean,
    banker_locked_reason: String,
    status: String,
    createBy: ObjectId,
    updatedBy: ObjectId
});

// Load BaseModel
AccountsSchema.loadClass(BaseModel);
AccountsSchema.plugin(BaseSchema);

// Export Model
export default mongoose.model(collectionName, AccountsSchema, collectionName)