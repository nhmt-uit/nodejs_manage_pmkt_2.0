import TCurrenciesModel from "../../models/TCurrenciesModel"
import Exception from "../../utils/Exception"


class TCurrenciesController {
    async listTCurrencies (req, res, next) {
        try {
            const tcurrencies = await TCurrenciesModel.findAll()
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: tcurrencies,
            })
        } catch (err) {
            next (err)
        }
    }

    async saveConfig (req, res, next) {
        try {
            const data = req.body

            await TCurrenciesModel.saveConfig(data)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: data,
            })
        } catch (err) {
            next (err)
        }
    }

    async updateTCurrencies (req, res, next) {
        try {
            const item = req.body
            item.t_currency_id = req.params.id

            await TCurrenciesModel.updateTCurrencies(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: item,
            })
        } catch (err) {
            next (err)
        }
    }
}

export default new TCurrenciesController()