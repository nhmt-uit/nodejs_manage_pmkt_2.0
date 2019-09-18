import mongoose from 'mongoose'
import _isEmpty from 'lodash/isEmpty'

import BaseModel, { BaseSchema, ExcludeFields } from "../utils/mongoose/BaseModel"
import Session from '../utils/Session'

// Define collection name
const collectionName = "account_formula"

// Define collection schema
const Schema = mongoose.Schema
const AccountFormulaSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    account_id: mongoose.Types.ObjectId,
    member_id: mongoose.Types.ObjectId,
    formula_id: mongoose.Types.ObjectId,
    formula_group_id: mongoose.Types.ObjectId,
})

// Load BaseModel
AccountFormulaSchema.loadClass(BaseModel)
AccountFormulaSchema.plugin(BaseSchema)

// Load Exclude Fields
const excludeFields = [ ...ExcludeFields ]

// Defined methods
AccountFormulaSchema.statics.findDoc = ({ options = {}, terms = {}} = {}) => {
    options.status = 'active'

    terms = this.default.parseQuery(terms)

    let query = this.default.find(options)

    if (terms.sort) query = query.sort(terms.sort)

    if (Number(terms.limit) > 0) {
        const skip = Number(terms.page) > 0
            ? (Number(terms.page) - 1) * Number(terms.limit)
            : 0

        query = query.limit(Number(terms.limit)).skip(skip)
    }

    return query.select(excludeFields.join(' ')).lean()
}

AccountFormulaSchema.statics.checkExisted = async (options) => {
    if (!options || _isEmpty(options)) return false

    options.status = 'active'
    options.user_id = Session.get('user._id')

    const result = await this.default.countDocuments(options)

    return !!result
}

AccountFormulaSchema.statics.createDoc = formData => {
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

AccountFormulaSchema.statics.updateDoc = (id, { formData }) => {
    delete formData.status
    delete formData.name

    return this.default.findByIdAndUpdate(id, formData, { new: true })
        .select(excludeFields.join(' '))
        .lean()
}

// Export Model
export default mongoose.model(collectionName, AccountFormulaSchema, collectionName)