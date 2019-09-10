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
    return this.default.find()
}

export default mongoose.model(collectionName, BooksSchema, collectionName)