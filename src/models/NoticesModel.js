
import mongoose from "mongoose"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"
import languagesModel from "./LanguagesModel"
// Define collection name
const collectionName = "notices"

// Define collection schema
const NoticesSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    type: String,
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



NoticesSchema.statics.findAll = async (language_id) => {
    const result = await this.default.find({"contents.language_id" : mongoose.Types.ObjectId(language_id)})
    return result
}

NoticesSchema.statics.find_id = async (id) => {
    const result = await this.default.find({ _id: id, status: 'active' })
        .select("_id name type contents status")

    return result
}
NoticesSchema.statics.createNotices = async (data) => {

    const temp = JSON.parse(data.contents)
    let A = {
        _id: new mongoose.Types.ObjectId(),
        name: data.name,
        type: data.type,
        contents: [{
            "_id": new mongoose.Types.ObjectId(),
            "language_id": temp.language_id,
            "content": temp.content
        }]
    }
    const Notice = await this.default.create(A)
    return this.default.findById(Notice._id)
        .select("_id name type contents status")
}
NoticesSchema.statics.updateNotice = async (data) => {
    // const A =JSON.stringify(data.contents)
    const A = this.default.findOneAndUpdate(
        { _id: data.id },
        {
            '$set': {
                'name': data.name,
                'type': data.type,
                'contents': data.contents ,
            }
        },
        { new: true },
    ).select("-_id name type contents status")
    
    
    return A
}
NoticesSchema.statics.delete = async (id) => {
    return this.default.findOneAndDelete({ _id: id })
    .select("_id name type contents status")
}

export default mongoose.model(collectionName, NoticesSchema, collectionName)