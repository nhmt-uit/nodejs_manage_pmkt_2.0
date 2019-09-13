/*
|--------------------------------------------------------------------------
| Base Model Class
| Define base method
|--------------------------------------------------------------------------
*/
import mongoose from "mongoose"

import Session from "../Session"


// Exteneral fields
const BaseFields = {
    status: { type: String, lowercase: true, trim: true, enum: ["active", "inactive", "delete"], default: "active" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
}


// BaseSchema process middleware
const BaseSchema = schema => {
    // Add Exteneral fields
    schema.add(BaseFields)

    // Disabled version key in collection
    schema.set("versionKey", false)
    schema.set("timestamps", true)

    // Create a pre-save hook
    schema.pre("save", function(next) {
        const userInfo = Session.get("user")
        if (userInfo) {
            this.updatedBy = userInfo._id ? userInfo._id : null
            if (!this.createdAt) {
                this.createdBy = userInfo._id ? userInfo._id : null
            }
        }
        next()
    })

    // Create a pre-findOneAndUpdate hook
    schema.pre("findOneAndUpdate", function(next) {
        const userInfo = Session.get("user")
        if (userInfo) {
            this._update.updatedBy = userInfo._id ? userInfo._id : null
        }
        next()
    })
}

// Based function
class BaseModel {
    // Update status => "delete"
    static softDelete(id) {
        return this.updateOne({_id: id}, {status: "delete"})
    }

    // Temp function
    static findByFullName(username) {
        return this.find({ username: username })
    }
}

export default BaseModel
export {
    BaseSchema,
    BaseFields
}