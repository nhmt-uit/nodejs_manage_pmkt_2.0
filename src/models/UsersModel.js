import mongoose from "mongoose"

import BaseModel, { BaseSchema } from "../utils/mongoose/BaseModel"
import Session from "../utils/Session"
import Helpers from "../utils/Helpers"

// Define collection name
const collectionName = "users"

// Define collection schema
const UsersSchema = new mongoose.Schema({
    parent_id: mongoose.Types.ObjectId,
    username: String,
    password: String,
    password2: String,
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

UsersSchema.statics.findAllUser = async (query) => {
    const parent_id = Session.get('user.parent_id')
    const limit = parseInt(query.limit, 10)
    const skip = parseInt(query.page, 10) * limit - 1
    const result = await this.default.find({ status: 'active', parent_id: parent_id, role: 10 })
        .select(excludeFields.join(' ')).lean()
        .sort(query.sort)
        .limit(limit)
        .skip(skip)
    return result
}


UsersSchema.statics.detailUser = async (query) => {
    const parent_id = Session.get('user.parent_id')
    const limit = parseInt(query.limit, 10)
    const skip = parseInt(query.page, 10) * limit - 1
    const result = await this.default.find({ status: 'active', parent_id: parent_id, role: 11 })
        .select(excludeFields.join(' ')).lean()
        .sort(query.sort)
        .limit(limit)
        .skip(skip)
    return result
}


UsersSchema.statics.detailSubUser = async (query) => {
    const user_id = Session.get('user._id')
    const limit = parseInt(query.limit, 10)
    const skip = parseInt(query.page, 10) * limit - 1
    const result = await this.default.find({ status: 'active', parent_id: user_id, role: 12 })
        .select(excludeFields.join(' ')).lean()
        .sort(query.sort)
        .limit(limit)
        .skip(skip)
    return result
}

UsersSchema.statics.generateUsername = async (query) => {
    const user_id = Session.get('user._id')
    const username = Session.get('user.username')
    let options = {}
    let listUsernameCompare = []
    if (query.type === 'sub') {
        options = {
            status: 'active',
            username: { "$regex": username + query.type, "$options": "i" },
            parent_id: user_id,
            role: 12
        }

        for(let i = 0; i < 1000; i++ ) {
            listUsernameCompare.push(`${username}${query.type}${Helpers.getNumberPad(i)}`)
        }

    } else if (query.type === 'member') {
        options = {
            status: 'active',
            username: { "$regex": username, "$options": "i" },
            parent_id: user_id,
            role: 11
        }

        for(let i = 1; i < 1000; i++ ) {
            listUsernameCompare.push(`${username}${Helpers.getNumberPad(i)}`)
        }

    }

    const result = await this.default.find(options)
                                    .select('username -_id').lean()
                                    .sort("username")
                                    .lean()



    const resultCompare = listUsernameCompare.filter(function(element){
        if(result.indexOf(element) != -1){
            console.log('1')
        }
    })

        return resultCompare
  //  return 'av8899sub002'
   // return 'av8899006'
}


UsersSchema.statics.checkExist = async (options) => {
    let result
    console.log(options)
    if (options.value)
        return !!result
}

UsersSchema.statics.createUser = async (data) => {
    const temp = JSON.parse(data.contents)
    let newObject = {
        _id: new mongoose.Types.ObjectId(),
        name: data.name,
        type: data.type,
        contents: [{
            "_id": new mongoose.Types.ObjectId(),
            "language_id": temp.language_id,
            "content": temp.content
        }],



        parent_id: mongoose.Types.ObjectId,
    username: String,
    password: String,
    password2: String,
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
    }
    const User = await this.default.create(newObject)
    return this.default.findById(Notice._id)
        .select(excludeFields.join(' ')).lean()
}


UsersSchema.statics.checkUniqueUsername = (username) => {
    return this.default.find({
        username: username,
    })
        .then((users) => {
            if (users.length !== 0 && users[0].status === 'active') {
                return false
            } else return true
        })
}




// Export Model
export default mongoose.model(collectionName, UsersSchema, collectionName)