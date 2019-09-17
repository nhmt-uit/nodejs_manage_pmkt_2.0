import { check } from "express-validator"

import LanguagesSchema from "../../models/LanguagesModel"
import Exception from "../../utils/Exception"
import LanguagesModel from "../../models/LanguagesModel"

const FormulaGroupsValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/user
    | Method: POST
    |--------------------------------------------------------------------------
    */
    
    postCreate: [
        check('name')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))

            .custom(async (value) => {
                let isUnique = await LanguagesSchema.checkName(value)
                if (!isUnique) return Promise.reject(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, { field: value }))
            }),
        check('code')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))

            .custom(async (value) => {
                let isUnique = await LanguagesSchema.checkCode(value)
                if (!isUnique) return Promise.reject(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, { field: value }))
            }),
    ],

}

export default FormulaGroupsValidator