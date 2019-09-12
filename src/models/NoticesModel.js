
import mongoose from "mongoose"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"
// Define collection name
const collectionName = "notices"

// Define collection schema
const NoticesSchema = new mongoose.Schema({
	_id: mongoose.Types.ObjectId,
    name: String,
    contents: [
        {
            _id: mongoose.Types.ObjectId,
            language_id: mongoose.Types.ObjectId,
            content: String
        }
    ],
})
// Load BaseModel
NoticesSchema.loadClass(BaseModel);
NoticesSchema.plugin(BaseSchema)



NoticesSchema.statics.findAll = async () => {

    const result = await this.default.find({ status: 'active' })
                                     .select("_id name contents status")
                                     .limit(10)

    return result
}

NoticesSchema.statics.find_id = async (id) => {
    console.log(id)
    const result = await this.default.find({ _id: id, status: 'active' })
                                     .select("_id name contents status")

    return result
}
NoticesSchema.statics.createNotices = async (data) => {

    let A = {
        _id: new mongoose.Types.ObjectId(),
        name: data.name,
        contents: [{
             "_id": new mongoose.Types.ObjectId(),
             "language_id" : language_id,
             "content" : data.content
        }],
    }
    const Notice = await this.default.create(A)
    return this.default.findById(Notice._id)
                       .select("_id name contents status")
}
NoticesSchema.statics.updateLanguage = async (item) => {

    return this.default.findOneAndUpdate(
        { _id: item._id },
        { '$set': { 'name': item.name } },
        { new: true },
    )
                      .select("_id name code order")
}
NoticesSchema.statics.delete = async (id) => {
    return this.default.findOneAndDelete({ _id: id })
                       .select("_id name code order")
}

export default mongoose.model(collectionName,NoticesSchema,collectionName)