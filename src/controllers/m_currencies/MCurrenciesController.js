import MCurrenciesModel from "../../models/MCurrenciesModel"
import Exception from "../../utils/Exception";


class MCurrenciesController {
    async listMCurrencies (req, res, next) {
        try {
            const mcurrencies = await MCurrenciesModel.findAll()
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: mcurrencies,
            })
        } catch (err) {
            next (err)
        }
    }

    async mCurrencyDetail (req, res, next) {
        const currency_id = req.params.id
        try {
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
        const item = req.body
        try {
            await MCurrenciesModel.createMCurrency(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: item,
            })
        } catch (err) {
            next (err)
        }
    }

    async updateMCurrency (req, res, next) {
        const item = req.body
        item.currency_id = req.params.id
        try {
            await MCurrenciesModel.updateMCurrency(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: "item",
            })
        } catch (err) {
            next (err)
        }
    }

    async checkExists (req, res, next) {
        const params = {
            name: req.body.name,
            type: 'name'
        }
        try{
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
        const id = req.params.id
        try {
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