import mongoose from "mongoose"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"

import Session from "../utils/Session"

// Define collection name
const collectionName = "users"

// Define collection schema
const UsersSchema = new mongoose.Schema({
	parent_id: mongoose.Types.ObjectId,
    username: String,
    password: String,
    password2:String,
    role: Number,
    secure_code: Number,
    login_failed: Number,
    lang_code: String,
    allow_export: Boolean,
    allow_report_detail: Boolean,
    enable_start: Date,
    enable_end: Date,
    old_password: String,
    is_updated_password: Boolean,
    old_password2: String,
    is_updated_password2: Boolean,
    is_lock: Boolean
})
// Load BaseModel
UsersSchema.loadClass(BaseModel)
UsersSchema.plugin(BaseSchema)


UsersSchema.statics.findAll = (username) => {
	// return this.default.find({
	//   	username: username,
	// })
}

UsersSchema.statics.checkUniqueUsername = (username) => {
	return this.default.find({
		username: username,
	})
		.then( (users) => {
			if (users.length !== 0 && users[0].status === 'active'){
				return false
			} else return true
		})
}


// Export Model
export default mongoose.model(collectionName, UsersSchema, collectionName)