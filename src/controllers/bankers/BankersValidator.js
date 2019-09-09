import { check } from "express-validator"
import ExceptionConfig from "../../configs/ExceptionConfig"

import BankersSchema from "../../models/BankersModel"

const BankerValidator = {

    postCreateUpdateHostBanker: [
        check('banker_id')
            .exists().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
            .not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)

            .custom( async value => {
                let isUnique = await BankersSchema.checkBanker(value);
                if(!isUnique){
                    return Promise.reject('Not found Banker by id: ' + value)
                }
            }),

        check('host_url')
            .exists().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
            .not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD),
    ],

    deleteHostBanker: [
        check('banker_id')
            .exists().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
            .not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)

            .custom( async (value) => {
                let isUnique = await BankersSchema.checkBanker(value);
                if(!isUnique){
                    return Promise.reject('Not found Banker by id: ' + value)
                }
            }),

        check('id')
            .exists().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
            .not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)

            .custom( async (host_id, {req}) => {
                const banker_id = req.body.banker_id;
                let isUnique = await BankersSchema.checkHostBanker(banker_id, host_id)
                if(!isUnique){
                    return Promise.reject(`Not found Host Banker by id: {$value}`)
                }
            })
    ]

}

export default BankerValidator