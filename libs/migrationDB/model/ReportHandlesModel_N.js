
import mongoose from "../query/mongoose"

import { BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "report_handles"

// Define collection schema
const ReportHandles_NSchema = new mongoose.Schema({
	
    _id: mongoose.Types.ObjectId,
    report_id: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    t_currentcy_id: mongoose.Types.ObjectId,
    ref_transaction_id: mongoose.Types.ObjectId,
    type: String,
    origin_amount: number,
    amount: number,
    note: String,
        
    
})
ReportHandles_NSchema.plugin(BaseSchema_N)

export default mongoose.db_N.model(collectionName_N,ReportHandles_NSchema,collectionName_N)