import mongoose from '../query/mongoose'
import {BaseModel, BaseSchema } from "../cores/baseModel"

// Define collection name
const collectionName = "formula_fields";

// Define collection schema
const FormulaFieldsSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String
});
// Load BaseModel
FormulaFieldsSchema.plugin(BaseSchema);

export default mongoose.db.model(collectionName,FormulaFieldsSchema,collectionName)