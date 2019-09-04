import BankersModel from "../../models/BankersModel"
import ExceptionConfig from "../../configs/ExceptionConfig"
import Session from "../../utils/Session"

class BankersController {
    async index (req, res, next) {
        try {
            return res.jsonSuccess({
                message: "You requested bankers controller",
                errors: "You requested bankers controller"
            })
        } catch (err) {
            next (err)
        }
    }

    async save (req, res, next) {
        try {
            const banker = new BankersModel({

            })
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_CREATE_SUCCESS,
                data: banker
            })
        } catch (err) {
            next (err)
        }
    }
}

export default new BankersController()