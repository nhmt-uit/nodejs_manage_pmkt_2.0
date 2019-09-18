import mongoose from 'mongoose'
import _isEmpty from 'lodash/isEmpty'

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"
import Session from '../utils/Session'

// Define collection name
const collectionName = "accounts"

// Define collection schema
const Schema = mongoose.Schema
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
})
const excludeFields = [ '-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy' ]

// Defined methods
AccountsSchema.statics.findDoc = ({ options = {}, terms = {}} = {}) => {
    options.status = 'active'
    options.user_id = Session.get('user._id')
    
    let query = this.default.find(options)
        .sort(terms.sort)

    
    if (terms.typeFormat && terms.typeFormat === 'flat') {
        query = query.limit(Number(terms.limit)).skip(Number(terms.skip))
    }

    return query.select(excludeFields.join(' ')).lean()
}

AccountsSchema.statics.checkExisted = async (options) => {
    if (!options || _isEmpty(options)) return false

    options.status = 'active'
    options.user_id = Session.get('user._id')

    const result = await this.default.countDocuments(options)

    return !!result
}

AccountsSchema.statics.createDoc = formData => {
    const options = {
        status: 'active',
        user_id: Session.get('user._id'),
        banker_id: formData.banker_id,
        sub_user: formData.sub_user
    };

    formData.status = 'active'
    formData.user_id = Session.get('user._id')

    return this.default.findOneAndUpdate(options, formData, { upsert: true, new: true })
        .select(excludeFields.join(' '))
        .lean()
}

AccountsSchema.statics.updateDoc = (id, { formData }) => {
    delete formData.status
    delete formData.name

    return this.default.findByIdAndUpdate(id, formData, { new: true })
        .select(excludeFields.join(' '))
        .lean()
}

// Load BaseModel
AccountsSchema.loadClass(BaseModel)
AccountsSchema.plugin(BaseSchema)

// Export Model
export default mongoose.model(collectionName, AccountsSchema, collectionName)