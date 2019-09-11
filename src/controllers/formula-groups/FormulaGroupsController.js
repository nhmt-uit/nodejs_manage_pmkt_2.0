import { uniqBy as _uniqBy } from "lodash"
import FormulaGroupsModel from "../../models/FormulaGroupsModel"
import ExceptionConfig from "../../configs/ExceptionConfig"
import HashPassword from "../../utils/HashPassword"
import Session from "../../utils/Session"
import { Mongoose } from "mongoose"
import FormulasModel from "../../models/FormulasModel"
import Exception from "../../utils/Exception";


class FormulaGroupsController {
    async listData(req, res, next) {
        try {
            let formulaGroup = await FormulaGroupsModel.findAll()
            // Get Banker Info
            formulaGroup = formulaGroup.map(item => {
                const _item = JSON.parse(JSON.stringify(item))
                _item.bankers = _uniqBy(_item.formulas, "banker_id._id").map(elem => elem.banker_id)
                return _item
            })
            console.log(formulaGroup)

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: formulaGroup
            })
        } catch (err) {
            next(err)
        }
    }

    async dataById(req, res, next) {
        try {
            const id = req.params.id
            let formulaGroup = await FormulaGroupsModel.findOne({ _id: id })
                .select("_id user_id name formulas")

            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: formulaGroup
            })
        } catch (err) {
            next(err)
        }
    }

    async create(req, res, next) {
        try {
            const name = req.body.name
            const formulaGroup = await FormulaGroupsModel.createFormulaGroup(name)
            // const formulaGroup = new FormulaGroupsModel({
            //     name: "Test API - " + Math.round(Math.random()*10000000000)
            // })
            // await formulaGroup.save()
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: formulaGroup
            })
        } catch (err) {
            next(err)
        }
    }
    async addByBanker(req, res, next) {
        const item = req.body
        item.id = req.params.id
        try {
            let result = await FormulaGroupsModel.addByBanker(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async update(req, res, next) {
        try {
            const id = req.params.id
            let data = await FormulaGroupsModel.update(id, req.body)
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
            let data = await FormulaGroupsModel.delete(id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: data
            })
        } catch (err) {
            next(err)
        }
    }

    async deleteByBanker(req, res, next) {
        try {
            const item = req.body
            item.id = req.params.id
            let result = await FormulaGroupsModel.deleteByBanker(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

    async detail(req, res, next) {
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