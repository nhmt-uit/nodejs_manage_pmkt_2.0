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
    login_ip: String,
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


const excludeFields = ['-status', '-createdAt', '-updatedAt', '-createdBy', '-updatedBy']

UsersSchema.statics.findAll = async ( query) => {
    const bedbug_id = '56850ba0097802b9f23929ea'
    const limit = parseInt(query.limit, 10)
    const skip = parseInt(query.page, 10)*limit - 1
    const result = await this.default.find({status: 'active', parent_id : bedbug_id , role: 10})
                                     .select(excludeFields.join(' ')).lean()
                                     .sort(query.sort)
                                     .limit(limit)
                                     .skip(skip)
    return result
}


UsersSchema.statics.detailUser = async (query) => {
    const user_id = Session.get('user._id');
    const limit = parseInt(query.limit, 10)
    const skip = parseInt(query.page, 10)*limit - 1
    const result = await this.default.find({status: 'active' ,_id : user_id , role: 11})
                                     .select(excludeFields.join(' ')).lean()
                                     .sort(query.sort)
                                     .limit(limit)
                                     .skip(skip)
    return result
}


UsersSchema.statics.detailSubUser = async (query) => {
    const user_id = Session.get('user._id');
    const limit = parseInt(query.limit, 10)
    const skip = parseInt(query.page, 10)*limit - 1
    const result = await this.default.find({status: 'active' , _id : user_id , role: 12})
                                     .select(excludeFields.join(' ')).lean()
                                     .sort(query.sort)
                                     .limit(limit)
                                     .skip(skip)
    return result
}


UsersSchema.statics.checkExist = async (options) => {
    let result

    return !!result
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