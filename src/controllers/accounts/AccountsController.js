import AccountsModel from '../../models/AccountsModel'
import ExceptionConfig from '../../configs/ExceptionConfig'
import Recursive from "../../utils/Recursive"

class AccountsController {
    async index(req, res, next) {
        try {
            const accountList = await AccountsModel.findDoc();
            // const result = accountList;
            const result = Recursive.flatToTree(accountList);

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

    async detail(req, res, next) {
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
            const result = await AccountsModel.updateDoc({ options: { _id: req.params.id }, formData: req.body })

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_CREATE_SUCCESS,
                data: result
            })
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            await AccountsModel.softDelete(req.params.id);

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_DELETE_SUCCESS,
                data: req.params.id
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new AccountsController()