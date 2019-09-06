import { check } from "express-validator"
import ExceptionConfig from "../../configs/ExceptionConfig";

import AccountsModel from '../../models/AccountsModel'

const AccountValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/accounts
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postCreateAccount: [
        check('banker_id')
            .exists().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD),
        check('sub_user')
            .exists().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
            .custom(async (subUser, { req }) => {
                try {
                    const formData = {
                        banker_id: req.body.banker_id,
                        sub_user: req.body.sub_user,
                        sub_pass: req.body.sub_pass
                    };

                    const account = await AccountsModel.checkExisted(formData);

                    if (!account) throw new Error();
                } catch (e) {
                    throw e;
                }
            }).withMessage('Account is existed'),
        check('sub_pass')
            .exists().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD),
    ]
};

export default AccountValidator