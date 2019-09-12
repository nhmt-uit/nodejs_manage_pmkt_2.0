import mongoose from "mongoose"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"

import Session from "../utils/Session"

// Define collection name
const collectionName = "users"

// Define collection schema
const UsersSchema = new mongoose.Schema({
	username: { type: String, unique: true },
	password: String
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