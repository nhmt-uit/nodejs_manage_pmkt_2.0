import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel"

// Define collection name
const collectionName = "books"

// Define collection schema
const BooksSchema = new mongoose.Schema({
    name: String,
})

BooksSchema.loadClass(BaseModel)
BooksSchema.plugin(BaseSchema)

const excludeFields = [ '-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy' ];

BooksSchema.statics.findAll = (query) => {
    return this.default.find({status: 'active'}).select(excludeFields.join(' ')).lean()
        .sort(query.sort)
        .limit(Number(query.limit))
        .skip(Number(query.limit)*Number(query.page - 1))
}

export default mongoose.model(collectionName, BooksSchema, collectionName)