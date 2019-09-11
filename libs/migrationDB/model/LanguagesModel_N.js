
import mongoose from "../query/mongoose"

import { BaseSchema } from "../cores/baseModel_N"
// Define collection name
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

    const result = await this.default.find({ status: ' active' })
    return result
}

export default mongoose.db.model(collectionName,LanguagesSchema,collectionName)