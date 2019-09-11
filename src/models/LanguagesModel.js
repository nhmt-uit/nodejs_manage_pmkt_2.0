import mongoose from "mongoose"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"

import FormulasModel, { formulasSchema } from "./FormulasModel"
import BankersModel from "./BankersModel"
import { create } from "domain";



// Define collection name
const collectionName = "formula_groups";

// Define collection schema
const FormulaGroupSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    name: String,
    formulas: [mongoose.Types.ObjectId]

});

// Load BaseModel
FormulaGroupSchema.loadClass(BaseModel)
FormulaGroupSchema.plugin(BaseSchema);

FormulaGroupSchema.statics.findAll = async () => {

    const result = await this.default.find({ status: ' active' })
        .populate({
            model: FormulasModel,
            path: "formulas",
            select: "banker_id _id",
            populate: {
                model: "bankers",
                path: "banker_id",
                select: "_id name",
            }
        })
        .select('name _id')
        .limit(1)
        
    return result
}

// Export Model
export default mongoose.model(collectionName, FormulaGroupSchema, collectionName)



