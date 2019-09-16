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
AccountsSchema.statics.findDoc = ({ options = {}, fields = null, terms = {}} = {}) => {
    options.status = 'active'
    options.user_id = Session.get('user._id')

    fields = fields && Array.isArray(fields) 
        ? fields.filter(item => !excludeFields.includes(`-${item}`)) 
        : fields = excludeFields
    
    const query = this.default.find(options)
        .select(fields.join(' '))
        .sort(terms.sort)
        .lean()
    
    if (terms.typeFormat && terms.typeFormat === 'flat') {
        query.limit(Number(terms.limit)).skip(Number(terms.skip))
    }

    return query
}

AccountsSchema.statics.checkExisted = async (options) => {
    if (!options || _isEmpty(options)) return false

    options.status = 'active'
    options.user_id = Session.get('user._id')

    const result = await this.default.find(options)

    return !!(!result || !result.length)
}

AccountsSchema.statics.createDoc = formData => {
    formData.status = 'active'
    formData.user_id = Session.get('user._id')

    return this.default.save(body)
}

AccountsSchema.statics.updateDoc = ({ options, formData }) => {
    options.status = 'active'
    options.user_id = Session.get('user._id')

    delete formData.status
    delete formData.name

    return this.default.findOneAndUpdate(options, formData, { new: true })
}

// Load BaseModel
AccountsSchema.loadClass(BaseModel)
AccountsSchema.plugin(BaseSchema)

// Export Model
export default mongoose.model(collectionName, AccountsSchema, collectionName)