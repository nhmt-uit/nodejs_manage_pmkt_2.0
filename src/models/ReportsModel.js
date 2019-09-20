import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel"
import Session from "../utils/Session";
import ReportHandleModel from "./ReportHandleModel";
import ReportDetailModel from "./ReportDetailModel";

// Define collection name
const collectionName = "reports"

// Define collection schema
const ReportsSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    is_exported: {type: Boolean},
})

ReportsSchema.virtual('report_detail', {
    ref: 'report_details', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'report_id', // is equal to `foreignField`
})

ReportsSchema.virtual('report_handle', {
    ref: 'report_handles', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'report_id', // is equal to `foreignField`
})

ReportsSchema.loadClass(BaseModel)
ReportsSchema.plugin(BaseSchema)

const excludeFields = [ '-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy' ];

ReportsSchema.statics.findAll = ({ options = {}, terms = {}} = {}) => {
    options.status = 'active'
    options.user_id = Session.get('user._id')

    terms = this.default.parseQuery(terms)

    let query = this.default.find(options)

    if (terms.sort) query = query.sort(terms.sort)
    if(Number(terms.limit) > 0){
        const skip = Number(terms.page) > 0
            ? (Number(terms.page) - 1) * Number(terms.limit)
            : 0

        query = query.limit(Number(terms.limit)).skip(skip)
    }

    return query.select(excludeFields.join(' ')).lean()
}


ReportsSchema.statics.reportDetail = async ({ options = {}, report_id} = {}) => {
    options.status = 'active'
    options.user_id = Session.get('user._id')
    options._id = report_id

    const result = await this.default.findOne(options)
        .populate("report_detail", {'_id': 1, 'flag': 1, 'amount': 1, 'formula_detail': 1,})
        .populate("report_handle", {'_id': 1, 'origin_amount': 1, 'amount': 1, 'note': 1})
        .select(excludeFields.join(' ')).lean()
    return result
}


ReportsSchema.statics.deleteReport = async report_id => {

}

export default mongoose.model(collectionName, ReportsSchema, collectionName)