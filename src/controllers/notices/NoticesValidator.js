import { check } from "express-validator"

import NoticesSchema from "../../models/NoticesModel"
import Exception from "../../utils/Exception"

const NoticesValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/user
    | Method: POST
    |--------------------------------------------------------------------------
    */
    getList: [
        check(`sort[${'*'}]`)
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
                let isUnique = await NoticesSchema.checkName(value)
                if (!isUnique) return Promise.reject(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, { field: value }))
            }),
        check('type')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))

            .custom(async (value) => {
                if(value){
                    const type = parseInt(value, 10)
                    if (isNaN(type - 1))
                        return Promise.reject(Exception.getMessage(Exception.VALIDATION.REQUIRE_INCORECT, { field: value }))
                }
            }),
    ],

}

export default NoticesValidator