import mongoose from 'mongoose'

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"

// Define collection name
const collectionName = "formulas";

// Define collection schema
const formulasSchema = new mongoose.Schema({
    banker_id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    t_currency_id: mongoose.Types.ObjectId,
    formula_format_id: mongoose.Types.ObjectId,
    name: String,
    fields: [
        {
            formula_field_id: mongoose.Types.ObjectId,
            value: Number
        }
    ],
    rec_pay: Number
});
// Load BaseModel
formulasSchema.loadClass(BaseModel)
formulasSchema.plugin(BaseSchema);

export default mongoose.model(collectionName, formulasSchema, collectionName)
export{
    formulasSchema
}