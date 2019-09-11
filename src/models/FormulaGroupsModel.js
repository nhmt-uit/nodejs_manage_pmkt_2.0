import mongoose from "mongoose"



import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"
import formulasModel from "./FormulasModel"
import bankersModel from "./BankersModel"
import Session from '../utils/Session'
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

FormulaGroupSchema.statics.findAll = async (user_id) => {
    // const userInfo = Session.get('user').id;
    

    const result = await this.default.find({user_id: user_id, status: 'active'})
        .populate({
            model: formulasModel,
            path: "formulas",
            select: "banker_id _id",
            populate: {
                model: 'bankers',
                path: "banker_id",
                select: "_id name",
            }
        })
        .select('name _id status')
      
    return result
}

FormulaGroupSchema.statics.createFormulaGroup = async (name) => {
    let data = {
        _id: new mongoose.Types.ObjectId(),
        name: name
    }
    const FormulaGroup = await this.default.create(data)
    return this.default.findById(FormulaGroup._id)
        .select("_id user_id name formulas")
}

FormulaGroupSchema.statics.addByBanker =  (item) => {
    
    if(!item.formula_id){ return false
    }else{
    const result = this.default.findOneAndUpdate(
        { _id: item.id },
        { $push: { "formulas": [item.formula_id] } },
        {new: true}
        )
        .select("_id user_id name formulas")
        
        return result
    }
    
}

FormulaGroupSchema.statics.updateFormulaGroup = async (item) => {
   
    return this.default.findOneAndUpdate(
        {_id: item._id },
        {'$set': {'name': item.name}},
        {new: true},
    )
    .select("_id user_id name formulas")
}

FormulaGroupSchema.statics.delete = async (id) => {
    return this.default.findOneAndDelete({ _id: id })
        .select("_id user_id name formulas")
}


FormulaGroupSchema.statics.deleteByBanker = async (item) => {
    const FormulaGroup = await this.default.findById(item.id)
        .populate({
            model: formulasModel,
            path: "formulas",
            select: "_id name banker_id"
        })
    const formulas = FormulaGroup.formulas
    const Banker = formulas.find(formulas => formulas.banker_id == item.banker_id)
    if (!Banker) {
        return false
    } else {
        const result = await this.default.findByIdAndUpdate(
            { _id: item.id },
            { $pull: { "formulas": { $in: [Banker._id] } } },
            {new: true},
           
        )
        return result
    }
}


FormulaGroupSchema.statics.checkFormulas = async (id, value) => {
    const result = await this.default.findOne({ _id: id }, { status: 'active' })
        .populate()
        .select('formulas')
    if (result.formulas.indexOf(value) !== -1) return false
    return true
}
FormulaGroupSchema.statics.checkName = async (value) => {
    const result = await this.default.findOne({ name: value }, { status: 'active' })
    if (result) return false
    return true
}
FormulaGroupSchema.statics.checkBanker_id = async (value) => {
    const result = await this.default.findOne({ name: value }, { status: 'active' })
    if (result) return false
    return true
}
// Export Model
export default mongoose.model(collectionName, FormulaGroupSchema, collectionName)



