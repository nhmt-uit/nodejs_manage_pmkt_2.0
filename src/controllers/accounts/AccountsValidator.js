import { check } from "express-validator"
import ExceptionConfig from "../../configs/ExceptionConfig"
// import Exception from "../../utils/Exception"

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
            .exists().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD),
        check('sub_pass')
            .exists().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD),
        check('name')
            .custom(async (name, { req }) => {
                try {
                    const formData = {
                        banker_id: req.body.banker_id,
                        name: req.body.name,
                    }

                    const account = await AccountsModel.checkExisted(formData)

                    if (!account) throw new Error()
                } catch (e) {
                    throw e
                }
            // }).withMessage(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, { field: 'Account' }))
            }).withMessage('Account is existed')
    ],

     /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/accounts/:id
    | Method: PUT
    |--------------------------------------------------------------------------
    */
//    putUpdateAccount: [
//     check('name')
//         .custom(async (name, { req }) => {
//             try {
//                 const formData = {
//                     banker_id: req.body.banker_id,
//                     name: req.body.name,
//                     _id: { $ne: req.params.id }
//                 }

//                 const account = await AccountsModel.checkExisted(formData)

//                 if (account) throw new Error()
//             } catch (e) {
//                 throw e
//             }
//         // }).withMessage(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, { field: 'Account' }))
//         }).withMessage('Account is existed')
//     ]
}

export default AccountValidator