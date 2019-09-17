import mongoose from 'mongoose'

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"
import Session from '../utils/Session'
// Define collection name
const collectionName = "formulas"

// Define collection schema
const FormulasSchema = new mongoose.Schema({
    banker_id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    t_currency_id: mongoose.Types.ObjectId,
    formula_format_id: mongoose.Types.ObjectId,
    name: String,
    fields: [{
            formula_field_id: mongoose.Types.ObjectId,
            value: Number
        }],
    rec_pay: Number
})
// Load BaseModel
FormulasSchema.loadClass(BaseModel)
FormulasSchema.plugin(BaseSchema)


const excludeFields = ['-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy']

FormulasSchema.statics.findAll = async (query) => {
    const user_id = Session.get('user._id');  
    const limit = parseInt(query.limit, 10)
    const skip = parseInt(query.page, 10)*limit - 1
    const result = await this.default.find({status:'active',user_id : user_id })
                                     .select(excludeFields.join(' '))
                                      .sort(query.sort)
                                     .limit(limit)
                                     .skip(skip)
                                     .lean()
    return result
}


FormulasSchema.statics.find_id = async (id) => {
    const result = await this.default.find({_id:id , status : 'active'})
                                     .select(excludeFields.join(' '))
                                     .lean()
    return result
}


FormulasSchema.statics.createFormula = async (data) => {
    const temp = JSON.parse(data.fields)
    let newObject = {
        _id: new mongoose.Types.ObjectId(),
        banker_id: data.banker_id,
        t_currency_id: data.t_currency_id,
        formula_format_id: data.formula_format_id,
        fields: [{
            "_id": new mongoose.Types.ObjectId(),
            "formula_field_id": temp.formula_field_id,
            "value": temp.value
        }],
        rec_pay: data.rec_pay,
    }
    const formula = await this.default.create(newObject)

    return this.default.findById(formula._id)
                       .select(excludeFields.join(' '))
                       .lean()
}


FormulasSchema.statics.updateFormula = async (data) => {
    return this.default.findByIdAndUpdate(
                        { _id: data.id },
                        {
                            '$set': {
                                'banker_id': data.banker_id,
                                't_currency_id': data.t_currency_id,
                                'formula_format_id': data.formula_format_id,
                                'type': data.formula_format_id,
                                'name': data.name,
                                'fields': data.fields,
                                'rec_pay': data.rec_pay,
                            }
                        },
                        { new: true },
                    )
                        .select(excludeFields.join(' '))
                        .lean()
}

export default mongoose.model(collectionName, FormulasSchema, collectionName)


