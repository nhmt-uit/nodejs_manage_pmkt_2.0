import MCurrenciesModel from "../../models/MCurrenciesModel"
import Exception from "../../utils/Exception";


class MCurrenciesController {
    async listMCurrencies (req, res, next) {
        try {
            const query = req.query

            const mcurrencies = await MCurrenciesModel.findAll(query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: mcurrencies,
            })
        } catch (err) {
            next (err)
        }
    }

    async mCurrencyDetail (req, res, next) {
        try {
            const currency_id = req.params.id

            const mcurrency_detail = await MCurrenciesModel.mCurrencyDetail(currency_id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: mcurrency_detail,
            })
        } catch (err) {
            next (err)
        }
    }

    async createMCurrency (req, res, next) {
        try {
            const item = req.body

            const result = await MCurrenciesModel.createMCurrency(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: result,
            })
        } catch (err) {
            next (err)
        }
    }

    async updateMCurrency (req, res, next) {
        try {
            const item = req.body
            item.currency_id = req.params.id

            const result = await MCurrenciesModel.updateMCurrency(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: result,
            })
        } catch (err) {
            next (err)
        }
    }

    async checkExists (req, res, next) {
        try{
            const params = {
                name: req.body.name,
                type: 'name'
            }

            const result = await MCurrenciesModel.checkExists(params)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.VALIDATION_ERROR),
                data:  result,
            })
        } catch (err) {
            next (err)
        }
    }

    async deleteMCurrency (req, res, next) {
        try {
            const id = req.params.id

            await MCurrenciesModel.deleteMCurrency(id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: id,
            })
        } catch (err) {
            next (err)
        }
    }
}

export default new MCurrenciesController()