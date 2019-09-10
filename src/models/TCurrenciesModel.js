import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel";
import Session from '../utils/Session'

// Define collection name
const collectionName = "t_currencies"

// Define collection schema
const Schema = mongoose.Schema;
const TCurrenciesSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    m_currency_id: { type: Schema.Types.ObjectId, required: true, ref: 'MCurrency' },
    round_type: Number,
    note: String,
})

TCurrenciesSchema.loadClass(BaseModel)
TCurrenciesSchema.plugin(BaseSchema)

TCurrenciesSchema.statics.findAll = () => {
    const userInfo = Session.get('user');
    const option = {
        status : 'active',
        user_id: userInfo.id
    }
    return this.default.find(option).select("-status -createdBy -createdAt -updatedBy -updatedAt")
}



export default mongoose.model(collectionName, TCurrenciesSchema, collectionName)