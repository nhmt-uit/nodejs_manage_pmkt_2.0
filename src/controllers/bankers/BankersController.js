import BankersModel from "../../models/BankersModel"
import ExceptionConfig from "../../configs/ExceptionConfig"
import Session from "../../utils/Session"

class BankersController {
    async listBankers (req, res, next) {
        try {
            const bankers = await BankersModel.findAll()
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data: bankers,
            })
        } catch (err) {
            next (err)
        }
    }

    async updateBanker (req, res, next) {
        let item = req.body
        try {
            await BankersModel.updateBanker(item)
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_UPDATE_SUCCESS,
                data: '',
            })
        } catch (err) {
            next (err)
        }
    }

    async detail (req, res, next) {
        try {
            return res.jsonSuccess({
                message: "You requested detail users controller",
                errors: "You requested detail users controller"
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new BankersController()