import FormulasModel from "../../models/FormulasModel"

import Exception from "../../utils/Exception"


class FormulasController {
    async list(req, res, next) {
        try {
            const query = req.query
            let result = await FormulasModel.findAll(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async detail(req, res, next) {
        try {
            const id = req.params.id
            let result = await FormulasModel.find_id(id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async save(req, res, next) {
        try {
            const result = await FormulasModel.createFormula(req.body)
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
            const temp =JSON.parse(req.body.fields)
            console.log(temp)
            const data = {
                id : req.params.id,
                banker_id: req.body.banker_id,
                t_currency_id: req.body.t_currency_id,
                formula_format_id: req.body.formula_format_id,
                name: req.body.name,
                fields: temp,
                rec_pay: req.body.rec_pay,
            }
            let result = await FormulasModel.updateFormula(data)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: result

            })
        } catch (err) {
            next(err)
        }
    }
    async delete(req, res, next) {
        try {
            await FormulasModel.softDelete(req.params.id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: req.params.id
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new FormulasController()