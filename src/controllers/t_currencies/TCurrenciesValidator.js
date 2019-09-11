import { check } from "express-validator"

import TCurrenciesModel from "../../models/MCurrenciesModel"
import Exception from "../../utils/Exception";

const TCurrenciesValidator = {
    updateTCurrencies: [
        check('id')
            .custom( async value => {
                let isUnique = await TCurrenciesModel.checkId(value)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.INCORRECT_TYPE))
                }
            }),
        check('round_type')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .isNumeric().withMessage(Exception.getMessage(Exception.VALIDATION.INVALID_NUMBER)),

    ],

    saveConfig: [
        check('type')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
    ],

}

export default TCurrenciesValidator