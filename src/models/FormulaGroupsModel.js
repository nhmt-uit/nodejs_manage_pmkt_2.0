import mongoose from "mongoose"
// mSchema = {}

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"

import Session from "../utils/Session"
import { type } from "os";

// Define collection name
const collectionName = "formula-groups"

// Define collection schema
const FormulaGroupsSchema = new mongoose.Schema({
	id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    name: String,
    formulas: [
        
    ],
})
// Load BaseModel
FormulaGroupsSchema.loadClass(BaseModel)
FormulaGroupsSchema.plugin(BaseSchema)


FormulaGroupsSchema.statics.findAll = () => {
	return this.default.find()
}


FormulaGroupsSchema.statics.update = async (id,data) => {
	// const formulaGroup = await this.default.findbyIddandUpdate(id,{name: data.name},{new: true})
	const formulaGroup = await formula-groups.findOne({_id: id})
	// const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
	// 	new: true
	//   });
	// console.log(id)
	console.log(formulaGroup)
	// if(!formulaGroup) {
	// 	throw responseStatus.Code400({
	// 		errorMessage: responseStatus.formulaGroup_NOT_FOUND,
	// 	})
	// }

	// data.formulaGroup = data.formulaGroup || FormulaGroupsSchema.username
    // formulaGroup = await formulaGroup.save()
    
    // return responseStatus.Code200({
    //     message: responseStatus.UPDATE_USER_SUCCESS,
    //     formulaGroup: formulaGroup
    // })
	
}




// Export Model
export default mongoose.model(collectionName, FormulaGroupsSchema, collectionName) 

