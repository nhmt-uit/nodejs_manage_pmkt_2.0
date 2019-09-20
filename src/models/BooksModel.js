import mongoose from "mongoose"

import BaseModel, {BaseSchema} from "../utils/mongoose/BaseModel"
import Session from "../utils/Session";

// Define collection name
const collectionName = "books"

// Define collection schema
const BooksSchema = new mongoose.Schema({
    name: {type: String, required: true},
})

BooksSchema.loadClass(BaseModel)
BooksSchema.plugin(BaseSchema)

const excludeFields = [ '-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy' ];

BooksSchema.statics.findAll = ({ options = {}, terms = {}} = {}) => {
    options.status = 'active'

    terms = this.default.parseQuery(terms)

    let query = this.default.find(options)

    if (terms.sort) query = query.sort(terms.sort)
    if(Number(terms.limit) > 0){
        const skip = Number(terms.page) > 0
            ? (Number(terms.page) - 1) * Number(terms.limit)
            : 0

        query = query.limit(Number(terms.limit)).skip(skip)
    }

    return query.select(excludeFields.join(' ')).lean()
}

export default mongoose.model(collectionName, BooksSchema, collectionName)