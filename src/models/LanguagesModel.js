
import mongoose from "mongoose"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"

const collectionName = "languages"

// Define collection schema
const LanguagesSchema = new mongoose.Schema({
	_id: mongoose.Types.ObjectId,
    name: String,
    code: String,
    order: Number
})
// Load BaseModel
LanguagesSchema.plugin(BaseSchema)
LanguagesSchema.plugin(BaseSchema);

LanguagesSchema.statics.findAll = async () => {

    const result = await this.default.find({ status:' active' })
                                        .select("_id name code order")
                                        .limit(10)
    return result
}

LanguagesSchema.statics.findByName = async (name) => {
    console.log('AAAAA',name)
    const result = await this.default.find({name: name},{ status:'active' })
    .select("_id name code order")
    
    return result
}

export default mongoose.model(collectionName,LanguagesSchema,collectionName)