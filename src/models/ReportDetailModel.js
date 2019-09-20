import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel"
import Session from "../utils/Session";

// Define collection name
const collectionName = "report_details"

// Define collection schema
const ReportDetailSchema = new mongoose.Schema({
    report_id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    account_id: mongoose.Schema.Types.ObjectId,
    formula_detail: {
        t_currency_id: mongoose.Schema.Types.ObjectId,
        formula_id: mongoose.Schema.Types.ObjectId,
        formula_format_id: mongoose.Schema.Types.ObjectId,
        name: {type: String, required: true},
        rec_pay: {type: String, required: true},
        field: [{
            formula_field_id: mongoose.Schema.Types.ObjectId,
            value: {type: Number, required: true},
        }]
    },
    amount: {type: Number, required: true},
})

ReportDetailSchema.loadClass(BaseModel)
ReportDetailSchema.plugin(BaseSchema)

export default mongoose.model(collectionName, ReportDetailSchema, collectionName)