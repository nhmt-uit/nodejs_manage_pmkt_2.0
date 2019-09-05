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
            _id: mongoose.Schema.Types.ObjectId,
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
    if(!item['id']){
        throw new Error('id is required');
    }
    if (!item['host_url']) {
        throw new Error('host_url is required');
    }
    return this.checkBanker()

    // return this.default.find({
    //     _id: id,
    // })
    //     .then(function (banker) {
    //     })
}

BankersSchema.statics.checkBanker = () => {
    console.log("IDID", )
}

// Export Model
export default mongoose.model(collectionName, BankersSchema, collectionName)