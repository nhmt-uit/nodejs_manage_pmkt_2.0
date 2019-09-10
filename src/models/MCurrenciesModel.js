import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel";

// Define collection name
const collectionName = "m_currencies"

// Define collection schema
const MCurrenciesSchema = new mongoose.Schema({
    name: String,
    round_type: Number,
})

MCurrenciesSchema.loadClass(BaseModel)
MCurrenciesSchema.plugin(BaseSchema)

MCurrenciesSchema.statics.findAll = () => {
    return this.default.find({status: 'active'}).select("-status -createdBy -createdAt -updatedBy -updatedAt")
}


MCurrenciesSchema.statics.mCurrencyDetail = id => {
    return this.default.findOne({_id: id}).select("-status -createdBy -createdAt -updatedBy -updatedAt")
}


MCurrenciesSchema.statics.createMCurrency = item => {
    const data = {
        name: item.name,
        round_type: item.round_type
    }
    return this.default.create(data)
}


MCurrenciesSchema.statics.updateMCurrency = item => {
    const data = {
        name: item.name,
        round_type: item.round_type,
    }
    return this.default.updateOne({_id: item.currency_id}, data)
}


MCurrenciesSchema.statics.checkId = (id) => {
    const idTest = new mongoose.Types.ObjectId(id)

    if(idTest.toString() === id) return true

    return false
}


MCurrenciesSchema.statics.checkExists = async params => {
    let result
    switch (params.type) {
        case 'name':
            result = await this.default.findOne({name: params.name.toUpperCase()})
            break
        case 'id':
            result = await this.default.findOne({_id: params.id})
            break
        default:
            return
    }

    if (result) return true

    return false
}


MCurrenciesSchema.statics.checkCurrency = async name => {
     const currency = await this.default.findOne({name: name})

        if(!currency ) return false

        return true
}

MCurrenciesSchema.statics.deleteMCurrency = id => {
    return this.default.deleteOne({_id: id})
}


export default mongoose.model(collectionName, MCurrenciesSchema, collectionName)