
import mongoose from "mongoose"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"
import languagesModel from "./LanguagesModel"
// Define collection name
const collectionName = "notices"

// Define collection schema
const NoticesSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    type: Number,
    contents: [{
            _id: mongoose.Types.ObjectId,
            language_id: mongoose.Types.ObjectId,
            content: String
        }
    ],
})

<<<<<<< HEAD
=======
// NoticesSchema.virtual('total_language', {
//     ref: 'languages', // The model to use
//     localField: 'contents.language_id', // Find people where `localField`
//     foreignField: 'code', // is equal to `foreignField`
//     count: true // And only get the number of docs
// });

>>>>>>> 3839355274164d7173d2d314ab1ffecc1ba8c4e0
// Load BaseModel
NoticesSchema.loadClass(BaseModel);
NoticesSchema.plugin(BaseSchema)

const excludeFields = ['-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy']

NoticesSchema.statics.findAll = async (language_id, query) => {
    const limit = parseInt(query.limit, 10)
    const skip = parseInt(query.page, 10)*limit - 1
    const result = await this.default.find({"contents.language_id" : mongoose.Types.ObjectId(language_id)})
<<<<<<< HEAD
                                    .select(excludeFields.join(' '))
                                    .sort(query.sort)
                                    .limit(limit)
                                    .skip(skip)
                                    .lean()
=======
                                     .select(excludeFields.join(' ')).lean()
                                     .sort(query.sort)
                                     .limit(limit)
                                     .skip(skip)
>>>>>>> 3839355274164d7173d2d314ab1ffecc1ba8c4e0
    return result
}


NoticesSchema.statics.find_id = async (id) => {
    const result = await this.default.find({ _id: id, status: 'active' })
                                    .select(excludeFields.join(' ')).lean()

    return result
}


NoticesSchema.statics.createNotices = async (data) => {
    const temp = JSON.parse(data.contents)
    let newObject = {
        _id: new mongoose.Types.ObjectId(),
        name: data.name,
        type: data.type,
        contents: [{
            "_id": new mongoose.Types.ObjectId(),
            "type": 1 , 
            "date" : new Date(),
            "language_id": temp.language_id,
            "content": temp.content
        }]
    }
    const Notice = await this.default.create(newObject)
    return this.default.findById(Notice._id)
                        .select(excludeFields.join(' ')).lean()
}


NoticesSchema.statics.updateNotice = async (data) => {
    return this.default.findOneAndUpdate(
                            { _id: data.id },
                            {
                                '$set': {
                                    'name': data.name,
                                    'type': data.type,
                                    'contents': data.contents ,
                                }
                            },
                            { new: true },
                        )
                        .select(excludeFields.join(' ')).lean()
}


export default mongoose.model(collectionName, NoticesSchema, collectionName)