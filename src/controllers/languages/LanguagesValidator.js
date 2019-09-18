import { check } from "express-validator"

import LanguagesSchema from "../../models/LanguagesModel"
import Exception from "../../utils/Exception"

const LanguagesValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/user
    | Method: POST
    |--------------------------------------------------------------------------
    */
    getList: [
        check('sort[name]')
            .custom(async (value) => {
                if(value){
                if (value !== 'asc' && value !== '1' && value !== '-1' && value !== 'desc')
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.REQUIRE_INCORECT, { field: value }))
            }}),
        check('limit')
            .custom(async (value) => {
                if(value){
                const limit = parseInt(value, 10)
                if (isNaN(limit - 1) || limit < 0  )
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.REQUIRE_INCORECT, { field: value }))
            }}),
        check('page')
            .custom(async (value) => {
                if(value){
                const page = parseInt(value, 10)
                if (isNaN(page - 1) || page < 0)
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.REQUIRE_INCORECT, { field: value }))
            }}),
    ],

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
        check('order')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom(async (value) => {
                const order = parseInt(value, 10)
                if (isNaN(order - 1) || order <= 0)
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.REQUIRE_INCORECT, { field: value }))
            }),
    ],
    UpdateLanguage: [
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
        check('order')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom(async (value) => {
                const order = parseInt(value, 10)
                if (isNaN(order - 1) || order <= 0)
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.REQUIRE_INCORECT, { field: value }))
            }),
    ],

}

export default LanguagesValidator