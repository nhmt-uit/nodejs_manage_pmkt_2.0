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
    formulas: [mongoose.Schema.Types.ObjectId]

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
FormulaGroupSchema.statics.createFormulaGroup = async (name) => {
    let data = {
        _id : new mongoose.Types.ObjectId(),
        name: name
    }
     const FormulaGroup = await this.default.create(data)
     return this.default.findById(FormulaGroup._id)
     .select("_id user_id name formulas")
}


FormulaGroupSchema.statics.addByBanker = async (item) => {
    console.log(item)
    return this.default.findOneAndUpdate(
        { _id: item.id },
        { $push: { "formulas":  [item.IdOfFormulas] } }

    )   
    .select("_id user_id name formulas")
}

FormulaGroupSchema.statics.update = async (id, data) => {
    return this.default.findByIdAndUpdate(id, { name: data.name })
    .select("_id user_id name formulas")
}

FormulaGroupSchema.statics.delete = async (id) => {

    return this.default.findOneAndDelete({ _id: id })
    .select("_id user_id name formulas")
}


FormulaGroupSchema.statics.deleteByBanker = async (item) => {

    const FormulaGroup = await this.default.findById(item.id)
        .populate({
            model: FormulasModel,
            path: "formulas",
            select: "_id name banker_id"
        })
        
        const formulas = FormulaGroup.formulas
        const Banker = formulas.find(formulas => formulas.banker_id == item.IdOfBanker)
        console.log(Banker._id)

        return this.default.findByIdAndUpdate(
            {_id: item.id},
            {$pull:{"formulas":{$in:[Banker._id]}}}
        )
}


FormulaGroupSchema.statics.checkFormulas = async (id, value) => {
    const result = await this.default.findOne({_id: id}, {status : 'active'})
        .populate()
        .select('formulas')
    if(result.formulas.indexOf(value) !== -1 ) return false 
    return true
}

// Export Model
export default mongoose.model(collectionName, FormulaGroupSchema, collectionName)



