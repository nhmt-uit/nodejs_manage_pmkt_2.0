import mongoose from "mongoose"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"

import FormulasModel from "./FormulasModel"
import BankersModel from "./BankersModel"



// Define collection name
const collectionName = "formula_groups";

// Define collection schema
const FormulaGroupSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    name: String,
    formulas: mongoose.Schema.Types.Mixed
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
    return this.default.find()
}


FormulaGroupSchema.statics.update = async (id, data) => {
    return this.default.findByIdAndUpdate(id, { name: data.name })
}

FormulaGroupSchema.statics.delete = async (id) => {

    return this.default.findOneAndDelete({ _id: id })
}


FormulaGroupSchema.statics.deleteByBanker = async (formulaGroupId, formulaId) => {

    const formulaGroup =this.default.findById(formulaGroupId)
        .populate({
            model: FormulasModel,
            path: "formulas",
            populate: {
                model: BankersModel,
                path: "banker_id",
            }
        })
        .exec((err, res) => {
            // for(let i = 0 ; res.formulas[i].banker_id.length <i; i++)
            console.log(res.formulas[0])
        })

        
        console.log(formulaGroup)


        // return listBanker_id;


        

}


// Export Model
export default mongoose.model(collectionName, FormulaGroupSchema, collectionName)






