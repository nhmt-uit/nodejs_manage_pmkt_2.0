import TCurrenciesModel from "../../models/TCurrenciesModel"
import Exception from "../../utils/Exception";


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
}

export default new TCurrenciesController()