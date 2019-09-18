import { check } from "express-validator"

import NoticesSchema from "../../models/LanguagesModel"
import Exception from "../../utils/Exception"
import NoticesModel from "../../models/LanguagesModel"

const FormulaGroupsValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/user
    | Method: POST
    |--------------------------------------------------------------------------
    */
    GetList: [
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

}

export default FormulaGroupsValidator