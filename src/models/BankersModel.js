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

BankersSchema.statics.updateBanker = (item) => {
    if (!item['id']) {
        throw new Error('id is required');
    }
    if (!item['host_url']) {
        throw new Error('host_url is required');
    }

    return BankersSchema.statics.checkBanker(item['id'])
        .then(banker => {
            if (!item['host_id']) {
                return BankersSchema.statics.createHostBanker(item)
            } else {
                return BankersSchema.statics.updateHostBanker(item)
            }
        })

}

BankersSchema.statics.checkBanker = id => {
    return this.default.findOne({_id: id})
        .then(banker => {
            if (!banker) {
                throw new Error('Banker is not existed');
            }
            return banker;
        })
}

BankersSchema.statics.updateHostBanker = item => {
    return this.default.findOneAndUpdate(
        {_id: item['id'], "agent_host._id": item['host_id']},
        {
            '$set': {
                'agent_host.$.url': item['host_url'],
            }
        },
    )
}

BankersSchema.statics.createHostBanker = item => {
    let data = {
        url: item['host_url'],
    };
    return this.default.findOneAndUpdate(
        {_id: item['id']},
        { $push: {"agent_host": data}},
    )
}


// Export Model
export default mongoose.model(collectionName, BankersSchema, collectionName)