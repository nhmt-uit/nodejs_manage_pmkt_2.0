import AccountsModel from '../../models/AccountsModel'
import ExceptionConfig from '../../configs/ExceptionConfig'

class AccountsController {
    async index(req, res, next) {
        try {
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data: await AccountsModel.findDoc()
            })
        } catch (err) {
            next(err)
        }
    }

    async get(req, res, next) {
        try {
            const query = { _id: req.params.id };

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data: await AccountsModel.findDoc({ options: query})
            })
        } catch (err) {
            next(err)
        }
    }

    async save(req, res, next) {
        try {
            await AccountsModel.createDoc(req.body);

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_CREATE_SUCCESS,
                data: account
            })
        } catch (err) {
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_CREATE_SUCCESS,
                data: await AccountsModel.updateDoc({ options: { _id: req.params.id }, formData: req.body })
            })
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {

    }
}

export default new AccountsController()