
import FormulaGroupsModel from "../../models/FormulaGroupsModel"
import ExceptionConfig from "../../configs/ExceptionConfig"
import HashPassword from "../../utils/HashPassword"
import Session from "../../utils/Session"
import { Mongoose } from "mongoose"



class FormulaGroupsController { 
    async listData (req, res, next) {
        // const id = req.params.id
        try {
            let formulaGroup = await FormulaGroupsModel.findAll()
            
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_ALL_SUCCESS,
                data: formulaGroup
            })
        } catch (err) {
            next(err)
        }
    }
    async dataById (req, res, next) {
        const id = req.params.id
        try {
            let formulaGroup = await FormulaGroupsModel.findOne({_id:id})
            // const total = await users.count()
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_BY_ID_SUCCESS,
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
        
        try {
            let data = await FormulaGroupsModel.update(id, req.body)
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_UPDATE_SUCCESS,
                data: data
                
            })
        } catch (err) {
            next(err)
        }
    }

    async delete (req, res, next){
       const id = req.params.id
        try {
            let data = await FormulaGroupsModel.delete(id)
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_DELETE_SUCCESS,
                data: data
            })
        } catch (err) {
            next(err)
        }
    }

    async deleteByBanker (req, res, next){
        const data = req.body
        const id = req.params.id
        
        try {
            let result = await FormulaGroupsModel.deleteByBanker(id, data.formulaId)
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_DELETE_SUCCESS,
                data : result
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