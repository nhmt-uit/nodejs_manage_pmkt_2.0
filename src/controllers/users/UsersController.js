import _uniqBy from "lodash/uniqBy"

import UsersModel from "../../models/UsersModel"
import ExceptionConfig from "../../configs/ExceptionConfig"
import HashPassword from "../../utils/HashPassword"
import Session from "../../utils/Session"
import Exception from "../../utils/Exception"

class UsersController {
    async list(req, res, next) {
        try {
            const query = req.query
            console.log(query)
            let result = await UsersModel.findAll(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }


    async detailUsers(req, res, next) {
        try {
            const query = req.query
            let result = await UsersModel.detailUser(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

    async detailSubUsers(req, res, next) {
        try {
            const query = req.query
            let result = await UsersModel.detailSubUser(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

    async detailGenerate(req, res, next) {
        try {
            const query = req.query
            let result = await UsersModel.detailGenerate(query)
            // console.log(result)
            // result.username = result.map(item => {
            //     const _item = JSON.parse(JSON.stringify(item))
            //     console.log(_item)
                //_item.username = _uniqBy(_item.username, "username").map(elem => elem.username)

                // return result
            // })

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

    async checkExist(req, res, next) {
        try {
            const options = {
                value: req.query.value,
                type: req.query.type,
                password: req.query.password,
                password2: req.query.password2,
            }
            const result = await UsersModel.checkExist(options)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result,
            })
        } catch (err) {
            next(err)
        }
    }


    async save(req, res, next) {
        try {
            const data = {
                name: req.body.name,
                type: req.body.type,
                contents: req.body.contents,
            };
            const result = await UsersModel.createNotices(data)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

    async delete(req, res, next) {
        const id = req.params.id
        try {
            await UsersModel.softDelete(id)
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_DELETE_SUCCESS,
                data: id
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new UsersController()