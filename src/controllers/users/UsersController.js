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
            let result = await UsersModel.findAllUser(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }


    async detailMembers(req, res, next) {
        try {
            const query = req.query
            let result = await UsersModel.detailMembers(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }


    async detailSubUsers (req, res, next) {
        try {
            const query = req.query
            let result = await UsersModel.detailSubUsers(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

    async generateUsername(req, res, next) {
        try {
            const query = req.query
            let result = await UsersModel.generateUsername(query)
            const data = {
                username: result.substring(result.length -3,0),
                s0 : result.substring(result.length -2,result.length -3),
                s1 : result.substring(result.length -1,result.length -2),
                s2 : result.substring(result.length   ,result.length -1)
            }

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: data
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
        parent_id: mongoose.Types.parent_id,
        username: req.body.username,
        password: req.body.password,
        password2: req.body.password2,
        role: req.body.role,
        secure_code: req.body.secure_code,
        login_failed: req.body.login_failed,
        login_ip: req.body.login_ip,
        lang_code: req.body.lang_code,
        allow_export: req.body.allow_export,
        allow_report_detail: req.body.allow_report_detail,
        enable_start: req.body.enable_start,
        enable_end: req.body.enable_end,
        old_password: req.body.old_password,
        is_updated_password: req.body.is_updated_password,
        old_password2: req.body.old_password2,
        is_updated_password2: req.body.is_updated_password2,
        is_lock: req.body.is_lock
            };
            const result = await UsersModel.createUser(data)
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