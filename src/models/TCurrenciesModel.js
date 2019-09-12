import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel"
import Session from '../utils/Session'

// Define collection name
const collectionName = "t_currencies"

// Define collection schema
const Schema = mongoose.Schema
const TCurrenciesSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    m_currency_id: { type: Schema.Types.ObjectId, required: true, ref: 'MCurrency' },
    round_type: Number,
    note: String,
})

TCurrenciesSchema.loadClass(BaseModel)
TCurrenciesSchema.plugin(BaseSchema)

const userInfo = Session.get('user');
const excludeFields = [ '-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy' ]


TCurrenciesSchema.statics.findAll = (query) => {
    const option = {
        // status : 'active',
        // user_id: '56850ba0097802b9f2392a2b' //userInfo.id
    }
    return this.default.find(option).select(excludeFields.join(' ')).lean()
        .sort(query.sort)
        .limit(Number(query.limit))
        .skip(Number(query.limit)*Number(query.page - 1))
}


TCurrenciesSchema.statics.saveConfig = async (type, data) => {
    const userInfo_id = '56850ba0097802b9f2392a2b'

    if(data.length === 0){
        return this.default.updateMany({user_id: userInfo_id}, {$set:{status: "delete"}})
    } else {
        switch (type) {
            case "all":
                let ids = []
                data.forEach( async item => {
                    ids.push(item.m_currency_id)
                    const result = await TCurrenciesSchema.statics.checkExists(item)

                    await result ? TCurrenciesSchema.statics.updateTCurrencies(item) : TCurrenciesSchema.statics.createTCurrencies(item)
                })
                await TCurrenciesSchema.statics.updateStatus(ids)
                break

            case "single":
                data.forEach( async item => {
                    const result = await TCurrenciesSchema.statics.checkExists(item)

                    result ? TCurrenciesSchema.statics.updateTCurrencies(item) : TCurrenciesSchema.statics.createTCurrencies(item)
                })
                break

            default:
                return
        }
    }
}


TCurrenciesSchema.statics.checkExists = async item => {
    const userInfo_id = '56850ba0097802b9f2392a2b' //userInfo.id
    const result = await this.default.findOne({m_currency_id: item.m_currency_id, user_id: userInfo_id})

    return !!result
}


TCurrenciesSchema.statics.createTCurrencies = item => {
    const data = {
        user_id: '56850ba0097802b9f2392a2b', //userInfo.id
        m_currency_id: item.m_currency_id,
        round_type: item.round_type,
        note: ''
    }
    return this.default.create(data)
}


TCurrenciesSchema.statics.updateTCurrencies = item => {
    const data = {
        round_type: item.round_type,
        status: "active"
    }
    return this.default.updateOne({m_currency_id: item.m_currency_id}, data, {new: true})
}


TCurrenciesSchema.statics.updateStatus = (ids) => {
    const userInfo_id = '56850ba0097802b9f2392a2b' //userInfo.id

    return this.default.updateMany({user_id: userInfo_id, m_currency_id: { $nin: ids}}, {status: "delete"}, {new: true})
}


TCurrenciesSchema.statics.checkId = id => {
    const idTest = new mongoose.Types.ObjectId(id)
    return idTest.toString() === id
}


export default mongoose.model(collectionName, TCurrenciesSchema, collectionName)