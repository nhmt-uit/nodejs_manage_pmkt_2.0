import mongoose from "mongoose"


import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"

import Session from "../utils/Session"
import { type } from "os";

// Define collection name
const collectionName = "formula_groups";

// Define collection schema
const FormulasSchema = new mongoose.Schema({
    
    user_id: mongoose.Types.ObjectId,
    name: String,
	formulas: mongoose.Schema.Types.Mixed,
	
});

// Load BaseModel
FormulasSchema.loadClass(BaseModel)
FormulasSchema.plugin(BaseSchema);



FormulasSchema.statics.findAll = () => {
	return this.default.find()
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




// Export Model
export default mongoose.model(collectionName, FormulasSchema, collectionName) 

