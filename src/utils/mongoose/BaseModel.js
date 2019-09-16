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
    status: { type: String, lowercase: true, trim: true, enum: ["active", "inactive", "deleted"], default: "active" },
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
        const userID = Session.get("user._id")
        if (userID) {
            this.updatedBy = userID
            if (!this.createdAt) {
                this.createdBy = userID
            }
        }
        next()
    })

    // Create a pre-findOneAndUpdate hook
    schema.pre("findOneAndUpdate", function(next) {
        const userID = Session.get("user._id")
        if (userID && this._update) {
            this._update.updatedBy = userID
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
}

export default BaseModel
export {
    BaseSchema,
    BaseFields
}