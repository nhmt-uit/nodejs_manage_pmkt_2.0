import mongoose from '../query/mongoose'
import {BaseModel, BaseSchema } from "../cores/baseModel"

// Define collection name
const collectionName = "formulas";

// Define collection schema
const FormulasSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    banker_id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    t_currency_id: mongoose.Types.ObjectId,
    name: String,
    fields: [
        {
            id: mongoose.Types.ObjectId,
            value: String
        }
    ],
    rec_pay: Number
});
// Load BaseModel
FormulasSchema.plugin(BaseSchema);

export default mongoose.db.model(collectionName,FormulasSchema,collectionName)