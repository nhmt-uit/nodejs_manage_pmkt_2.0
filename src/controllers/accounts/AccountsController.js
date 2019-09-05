import AccountsModel from '../../models/AccountsModel'
import ExceptionConfig from '../../configs/ExceptionConfig'
import Session from '../../utils/Session';
import _isEmpty from 'lodash/isEmpty';

class AccountsController {
    async index(req, res, next) {
        try {
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data: await AccountsModel.findAll()
            })
        } catch (err) {
            next(err)
        }
    }

    async save(req, res, next) {
        try {
            await AccountsModel.create(req.body);

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_CREATE_SUCCESS,
                data: account
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new AccountsController()