import LanguagesModel from "../../models/LanguagesModel"

import ExceptionConfig from "../../configs/ExceptionConfig"
import HashPassword from "../../utils/HashPassword"
import Session from "../../utils/Session"
import { Mongoose } from "mongoose"
import Exception from "../../utils/Exception";


class LanguagesController {
    async listData(req, res, next) {
        try {
            const query = req.query
            let result = await LanguagesModel.findAll(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async dataByCode(req, res, next) {
        const code = req.body.code
        try {
            let result = await LanguagesModel.findByCode(code)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async create(req, res, next) {
        try {
            const name = req.body.name
            const code = req.body.code
            const order = req.body.order

            const result = await LanguagesModel.createLanguage(name, code, order)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async update(req, res, next) {
        try {
            const item = req.body
            item._id = req.params.id
            let data = await LanguagesModel.updateLanguage(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: data

            })
        } catch (err) {
            next(err)
        }
    }
    async delete(req, res, next) {
        try {
            const id = req.params.id
            let data = await LanguagesModel.delete(id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: data
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new LanguagesController()