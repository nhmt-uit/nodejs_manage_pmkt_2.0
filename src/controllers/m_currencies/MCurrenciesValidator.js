import { check } from "express-validator"

import MCurrenciesSchema from "../../models/MCurrenciesModel"
import Exception from "../../utils/Exception";

const MCurrenciesValidator = {
    getMCurrenciesDetail: [
        check('id')
            .custom( async value => {
                let isUnique = await MCurrenciesSchema.checkId(value)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.INCORRECT_TYPE))
                }
            })
            .custom(async value =>{
                const params = {
                    id: value,
                    type: 'id'
                }
                let isUnique = await MCurrenciesSchema.checkExists(params)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.NOT_FOUND_ERR, {field: value}))
                }
            }),
    ],

    createMCurrency: [
        check('name')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom( async value => {
               let isUnique = await MCurrenciesSchema.checkCurrency(value)
                if(isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, {field: value}))
                }
            }),
        check('round_type')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .isNumeric().withMessage(Exception.getMessage(Exception.VALIDATION.INVALID_NUMBER)),
    ],

    updateMCurrency: [
        check('id')
            .custom( async value => {
                let isUnique = await MCurrenciesSchema.checkId(value)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.INCORRECT_TYPE))
                }
            }),
        check('name')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom( async value => {
                let isUnique = await MCurrenciesSchema.checkCurrency(value)
                if(isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.IS_EXISTED, {field: value}))
                }
            }),
        check('round_type')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .isNumeric().withMessage(Exception.getMessage(Exception.VALIDATION.INVALID_NUMBER)),
    ],

    deleteMCurrency: [
        check('id')
            .custom( async value => {
                let isUnique = await MCurrenciesSchema.checkId(value)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.INCORRECT_TYPE))
                }
            })
            .custom(async value =>{
                const params = {
                    id: value,
                    type: 'id'
                }
                let isUnique = await MCurrenciesSchema.checkExists(params)
                if(!isUnique){
                    return Promise.reject(Exception.getMessage(Exception.VALIDATION.NOT_FOUND_ERR, {field: value}))
                }
            }),
    ]
}

export default MCurrenciesValidator