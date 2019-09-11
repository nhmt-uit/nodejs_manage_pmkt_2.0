import { check } from "express-validator"

import FormulaGroupSchema from "../../models/FormulaGroupsModel"
import Exception from "../../utils/Exception";

const FormulaGroupsValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/user
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postAddByBanker: [
        check('formula_id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))

            .custom(async (value, {req}) => {
                const id = req.params.id
                let isUnique = await FormulaGroupSchema.checkFormulas(id, value);
                if (!isUnique) return Promise.reject(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, { field: value }))

            }),
    ],
    postCreate: [
        check('name')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))

            .custom(async (value) => {
                let isUnique = await FormulaGroupSchema.checkName(value);
                if (!isUnique) return Promise.reject(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, { field: value }))

            }),
    ],
    postDeleteByBanker: [
        check('banker_id')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))

            .custom(async (value) => {
                let isUnique = await FormulaGroupSchema.checkBanker_id(value);
                if (!isUnique) return Promise.reject(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, { field: value }))

            }),
    ]
}

export default FormulaGroupsValidator