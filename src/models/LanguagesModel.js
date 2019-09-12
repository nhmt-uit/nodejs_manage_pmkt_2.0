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
LanguagesSchema.loadClass(BaseModel);
LanguagesSchema.plugin(BaseSchema);

LanguagesSchema.statics.findAll = async () => {

    const result = await this.default.find({ status: ' active' })
        .select("_id name code order status")

    return result
}

LanguagesSchema.statics.findByCode = async (code) => {
    const result = await this.default.find({ code: code, status: 'active' })
        .select("_id name code order status")

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
                       .select("_id name code order")
}
LanguagesSchema.statics.updateLanguage = async (item) => {

    return this.default.findOneAndUpdate(
        { _id: item._id },
        { '$set': { 'name': item.name } },
        { new: true },
    )
        .select("_id name code order")
}
LanguagesSchema.statics.delete = async (id) => {
    return this.default.findOneAndDelete({ _id: id })
               .select("_id name code order")
}
export default mongoose.model(collectionName, LanguagesSchema, collectionName)