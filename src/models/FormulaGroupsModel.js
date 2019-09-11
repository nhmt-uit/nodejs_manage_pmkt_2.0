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

// const formulaGroups = mongoose.model('formula_groups', FormulaGroupSchema)


// async function listFormulaGroup(){
//     const formulaGroup = await formulaGroups
//     .find()
//     .populate({
//         model: "formulas",
//         path: "formulas",
//         select: "_id name banker_id",
//         populate: {
//             model: "bankers",
//             path: "banker_id",
//         }
//     })
//     .select('formulas')
//     .limit(10)
//     .then((result) => {console.log(result)})

//     }


// listFormulaGroup()
// Load BaseModel
FormulaGroupSchema.loadClass(BaseModel)
FormulaGroupSchema.plugin(BaseSchema);



FormulaGroupSchema.statics.findAll = async () => {
    const FormulaGroup = await this.default.find({ status: ' active' }).limit(10)

    // console.log(FormulaGroup)
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
     return this.default.create(data)
}


FormulaGroupSchema.statics.addByBanker = async (item) => {
    const FormulaGroup = await this.default.findById(item.id)
        .populate({
            model: FormulasModel,
            path: "formulas",
            select: "_id name banker_id"
        })

    for (let i = 0; i < FormulaGroup.formulas.length; i++) {
        let banker_id = FormulaGroup.formulas[i].banker_id
        let formulas_id = FormulaGroup.formulas[i]._id
        console.log(banker_id)
        console.log(formulas_id)

        // if(banker_id == item.IdOfBanker){

        //   return this.default.findOneAndUpdate(
        //         {_id: item.id},
        //         { $push: {"formulas": ObjectId() }}
        //         )

        // }
    }
}


FormulaGroupSchema.statics.update = async (id, data) => {
    return this.default.findByIdAndUpdate(id, { name: data.name })
}

FormulaGroupSchema.statics.delete = async (id) => {

    return this.default.findOneAndDelete({ _id: id })
}


FormulaGroupSchema.statics.deleteByBanker = async (item) => {

    const FormulaGroup = await this.default.findById(item.id)
        .populate({
            model: FormulasModel,
            path: "formulas",
            select: "_id name banker_id"
        })

    for (let i = 0; i < FormulaGroup.formulas.length; i++) {
        let banker_id = FormulaGroup.formulas[i].banker_id
        let formulas_id = FormulaGroup.formulas[i]._id
        if (banker_id == item.IdOfBanker) {

            return this.default.findOneAndUpdate(
                { _id: item.id },
                { $pull: { "formulas": { $in: [formulas_id] } } }
            )

        }
    }

}




// Export Model
export default mongoose.model(collectionName, FormulaGroupSchema, collectionName)



