import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel"
import Session from "../utils/Session";

// Define collection name
const collectionName = "report_handles"

// Define collection schema
const ReportHandleSchema = new mongoose.Schema({
    report_id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    t_currency_id: mongoose.Schema.Types.ObjectId,
    ref_transaction_id: mongoose.Schema.Types.ObjectId,
    type: {type: String, required: true},
    origin_amount: {type: Number, required: true},
    amount: {type: Number, required: true},
    note: {type: String, required: true},
})

ReportHandleSchema.loadClass(BaseModel)
ReportHandleSchema.plugin(BaseSchema)

export default mongoose.model(collectionName, ReportHandleSchema, collectionName)