import mongoose from '../query/mongoose'
import {BaseModel, BaseSchema } from "../cores/baseModel"

// Define collection name
const collectionName = "formulas";

// Define collection schema
const FormulasSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    name: String,
    formulas: [mongoose.Types.ObjectId]
});
// Load BaseModel
FormulasSchema.plugin(BaseSchema);

export default mongoose.db.model(collectionName,FormulasSchema,collectionName)