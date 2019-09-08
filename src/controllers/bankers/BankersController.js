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

    async createHostBanker (req, res, next) {
        const item = req.body
        try {
            await BankersModel.createHostBanker(item)
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_CREATE_SUCCESS,
                data: item,
            })
        } catch (err) {
            next (err)
        }
    }

    async updateHostBanker (req, res, next) {
        const item = req.body
        item.host_id = req.params.id
        try {
            await BankersModel.updateHostBanker(item)
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_UPDATE_SUCCESS,
                data: item,
            })
        } catch (err) {
            next (err)
        }
    }

    async deleteHostBanker (req, res, next) {
        const item = req.body
        item.host_id = req.params.id
        try {
            await BankersModel.deleteHostBanker(item)
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_DELETE_SUCCESS,
                data: item,
            })
        } catch (err) {
            next (err)
        }
    }

}

export default new BankersController()