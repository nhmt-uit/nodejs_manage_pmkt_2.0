import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel";

// Define collection name
const collectionName = "bankers"

// Define collection schema
const BankersSchema = new mongoose.Schema({
    book_id: mongoose.Schema.Types.ObjectId,
    name: String,
    short_name: String,
    need_security: Boolean,
    agent_host: [
        {
            url: String
        }
    ],
    url: String,
})

BankersSchema.loadClass(BaseModel)
BankersSchema.plugin(BaseSchema)

BankersSchema.statics.findAll = () => {
    return this.default.find()
}


BankersSchema.statics.updateHostBanker = item => {
    return this.default.findOneAndUpdate(
        {_id: item.banker_id, "agent_host._id": item.host_id},
        {
            '$set': {
                'agent_host.$.url': item.host_url,
            }
        },
    )
}


BankersSchema.statics.createHostBanker = item => {
    let data = {
        url: item.host_url,
    };
    return this.default.findOneAndUpdate(
        {_id: item.banker_id},
        { $push: {"agent_host": data}},
    )
}


BankersSchema.statics.deleteHostBanker = item => {
    return this.default.findOneAndUpdate(
        {_id: item.banker_id},
        { $pull: {"agent_host": {_id: item.host_id}}}
    )
}


BankersSchema.statics.checkBanker = id => {
    return this.default.findOne({_id: id})
        .then((banker) => {
            if (!banker) return false
            return true
        })
}

BankersSchema.statics.checkHostBanker = (banker_id, host_id) => {
    return this.default.findOne({_id: banker_id})
        .then((banker) => {
            if (!banker) {
                return false
            } else {
                let foundHostBanker = false

                banker.agent_host.forEach( item => {
                    if( (item._id).toString() === host_id) foundHostBanker = true
                })
                if (foundHostBanker === false) return false
                return true
            }
        })
}


// Export Model
export default mongoose.model(collectionName, BankersSchema, collectionName)
export {
    BankersSchema,
}