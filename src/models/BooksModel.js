import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel";

// Define collection name
const collectionName = "books"

// Define collection schema
const BooksSchema = new mongoose.Schema({
    name: String,
})

BooksSchema.loadClass(BaseModel)
BooksSchema.plugin(BaseSchema)

BooksSchema.statics.findAll = () => {
    return this.default.find({status: 'active'}).select("-status -createdBy -createdAt -updatedBy -updatedAt")
}

export default mongoose.model(collectionName, BooksSchema, collectionName)