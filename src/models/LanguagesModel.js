import mongoose from "mongoose"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"

const collectionName = "languages"

// Define collection schema
const LanguagesSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    code: String,
    order: Number
})
// Load BaseModel
LanguagesSchema.loadClass(BaseModel)
LanguagesSchema.plugin(BaseSchema)

const excludeFields = ['-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy']

LanguagesSchema.statics.findAll = async (query) => {
        
    const limit = parseInt(query.limit, 10)
    const skip = parseInt(query.page, 10)*limit - 1
    const result = await this.default.find({ status: ' active' })
                                     .select(excludeFields.join(' ')).lean()
                                     .sort(query.sort||'-order')
                                     .limit(limit||10)
                                     .skip(skip||1)
    return result
}

LanguagesSchema.statics.findByCode = async (code) => {
    const result = await this.default.find({ code: code, status: 'active' })
                                     .select(excludeFields.join(' ')).lean()

    return result
}
LanguagesSchema.statics.createLanguage = async (name, code, order) => {
    let data = {
        _id: new mongoose.Types.ObjectId(),
        name: name,
        code: code,
        order: order
    }
    const Language = await this.default.create(data)
    return this.default.findById(Language._id)
                       .select(excludeFields.join(' ')).lean()
}
LanguagesSchema.statics.updateLanguage = async (item) => {

    return this.default.findOneAndUpdate(
                        { _id: item._id },
                        { '$set': { 'name': item.name } },
                        { new: true },
                    )
                    .select(excludeFields.join(' ')).lean()
}
LanguagesSchema.statics.delete = async (id) => {
    return this.default.findOneAndDelete({ _id: id })
                       .select(excludeFields.join(' ')).lean()
}
export default mongoose.model(collectionName, LanguagesSchema, collectionName)