import { check } from "express-validator"

import MCurrenciesModel from "../../models/MCurrenciesModel"
import Exception from "../../utils/Exception"

const MCurrenciesValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/mcurrencies
    | Method: GET
    |--------------------------------------------------------------------------
    */

    getMCurrenciesDetail: [
        check('id')
            .custom( async value => {
                let isUnique = await MCurrenciesModel.checkId(value)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.INCORRECT_TYPE))
                }
            })
            .custom(async value =>{
                const params = {
                    id: value,
                    type: 'id'
                }
                let isUnique = await MCurrenciesModel.checkExists(params)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.NOT_FOUND_ERR, {field: value}))
                }
            }),
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/mcurrencies
    | Method: POST
    |--------------------------------------------------------------------------
    */

    createMCurrency: [
        check('name')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom( async value => {
               let isUnique = await MCurrenciesModel.checkCurrency(value)
                if(isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, {field: value}))
                }
            }),

        check('round_type')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .isNumeric().withMessage(Exception.getMessage(Exception.VALIDATION.INVALID_NUMBER)),
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/mcurrencies/:id
    | Method: PUT
    |--------------------------------------------------------------------------
    */

    updateMCurrency: [
        check('id')
            .custom( async value => {
                let isUnique = await MCurrenciesModel.checkId(value)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.INCORRECT_TYPE))
                }
            })
            .custom(async value =>{
                const params = {
                    id: value,
                    type: 'id'
                }
                let isUnique = await MCurrenciesModel.checkExists(params)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.NOT_FOUND_ERR, {field: value}))
                }
            }),


        check('name')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom( async (value, {req}) => {
                const m_currency_id = req.params.id
                let isUnique = await MCurrenciesModel.checkCurrency(value, m_currency_id)
                if(isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, {field: value}))
                }
            }),

        check('round_type')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .isNumeric().withMessage(Exception.getMessage(Exception.VALIDATION.INVALID_NUMBER)),
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/mcurrencies/check-exists
    | Method: GET
    |--------------------------------------------------------------------------
    */

    checkExists: [
        check('name')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/mcurrencies/:id
    | Method: DELETE
    |--------------------------------------------------------------------------
    */

    deleteMCurrency: [
        check('id')
            .custom( async value => {
                let isUnique = await MCurrenciesModel.checkId(value)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.INCORRECT_TYPE))
                }
            })
            .custom(async value =>{
                const params = {
                    id: value,
                    type: 'id'
                }
                let isUnique = await MCurrenciesModel.checkExists(params)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.NOT_FOUND_ERR, {field: value}))
                }
            }),
    ]
}

export default MCurrenciesValidator