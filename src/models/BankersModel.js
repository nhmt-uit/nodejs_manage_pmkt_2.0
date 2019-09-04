import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel";

// Define collection name
const collectionName = "bankers"

// Define collection schema
const BankersSchema = new mongoose.Schema({
    book_id: {type: ObjectId, ref: ''},
    name: { type: String, unique: true },
    short_name: { type: String, unique: true },
    need_security: {type: Boolean, unique: true},
    agent_host: [
        {
            url: { type: String, unique: true },
            status: { type: String, lowercase: true, trim: true, enum: ["active", "inactive", "delete"], default: "active" }
        }
    ],
    url: { type: String, unique: true },
})

BankersSchema.loadClass(BaseModel)
BankersSchema.plugin(BaseSchema)


// Export Model
export default mongoose.model(collectionName, BankersSchema, collectionName)