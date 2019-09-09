import mongoose from "mongoose"
import {FormulaFormatsSchema} from "./FormulaFormatsModel"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"

import Session from "../utils/Session"
import { type } from "os";


// FormulaFormatsSchema = mongoose.model('formula_formats', FormulaFormatsSchema,'formula_formats')
// Define collection name
const collectionName = "formula_groups";


// Define collection schema
const FormulasSchema = new mongoose.Schema({
    
    user_id: mongoose.Types.ObjectId,
    name: String,
	formulas: mongoose.Schema.Types.Mixed,
	FormulaFormatsSchema: {
		type: mongoose.Schema.Types.ObjectId,
		ref:'banker_id'
	}
	
});



// Load BaseModel
FormulasSchema.loadClass(BaseModel)
FormulasSchema.plugin(BaseSchema);



FormulasSchema.statics.findAll = async () => {
	const A = await this.default
	.findOne()
    .select('name banker_id');
    console.log('AAAAAAAAAAA',A)
}


FormulasSchema.statics.update = async (id, data) => {
	
	return this.default.findByIdAndUpdate(id,{name : data.name})
}

FormulasSchema.statics.delete = async (id) => {
	
	return this.default.findOneAndDelete({_id:id})

// 	this.default
//   .findOne({ "name": "Test API - 7282211116" })
//   .populate('bankers')
//   .select('name')
//   .exec(function (err, banker) {
//     if (err) return handleError(err);
//     console.log('The BANKERNAME is %s', banker.name);
    
//   });

	
}


// FormulasSchema.statics.deleteByBanker = async (id) => {
	
// 	this.default
//   .findOne({ name: "Test API - 7282211116" })
//   .populate('banker')
//   .exec(function (err, story) {
//     if (err) return handleError(err);
//     console.log('The author is %s', this.default.name);
    
//   });
// }


// async function listFormulaGroup() {
// 	const FormulaGroups = await FormulasSchema
// 	.find()
// 	.select('name');
// 	console.log(FormulaGroups)
// }

// listFormulaGroup();
// Export Model
export default mongoose.model(collectionName, FormulasSchema, collectionName) 

