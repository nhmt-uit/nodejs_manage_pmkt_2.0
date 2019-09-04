
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "languages"

// Define collection schema
const Notices_NSchema = new mongoose.Schema({
	_id: mongoose.Types.ObjectId,
    lang_code: String,
    key: String,
    value: String,
})
// Load BaseModel
Notices_NSchema.plugin(BaseSchema_N)

export default mongoose.db_N.model(collectionName_N,Notices_NSchema,collectionName_N)