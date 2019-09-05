
import FormulaGroupsModel from "../../models/FormulaGroupsModel"
import ExceptionConfig from "../../configs/ExceptionConfig"
import HashPassword from "../../utils/HashPassword"
import Session from "../../utils/Session"



class FormulaGroupsController {
    async listData (req, res, next) {
        // const id = req.params.id
        try {
            const users = await FormulaGroupsModel.findAll()
            // const total = await users.count()
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data: users
            })
        } catch (err) {
            next(err)
        }
    }
    async dataById (req, res, next) {
        const id = req.params.id
        try {
            const formulaGroup = await FormulaGroupsModel.findOne({_id:id})
            // const total = await users.count()
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data: formulaGroup
            })
        } catch (err) {
            next(err)
        }
    }

    async save (req, res, next) {
        try {
            const formulaGroup = new FormulaGroupsModel({
                name: "Test API - " + Math.round(Math.random()*10000000000),
                // uid:,
            })
            await formulaGroup.save()
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_CREATE_SUCCESS,
                data: formulaGroup
            })
        } catch (err) {
            next(err)
        }
    }

    async update (req, res, next){
        const id = req.params.id
        console.log('aaaa',req.params.id)
        console.log('body', req.body)
        try {
            formulaGroup = await FormulaGroupsModel.update(id,req.body)
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_DELETE_SUCCESS,
                data: formulaGroup
            })
        } catch (err) {
            next(err)
        }
    }

    async delete (req, res, next){
        
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
    async deleteByBanker (req, res, next){
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

    async detail (req, res, next) {
        try {
            return res.send({
                message: "You requested detail formula controller",
                errors: "You requested detail formula controller"
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new FormulaGroupsController()