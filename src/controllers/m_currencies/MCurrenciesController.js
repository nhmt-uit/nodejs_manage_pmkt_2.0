import MCurrenciesModel from "../../models/MCurrenciesModel"
import Exception from "../../utils/Exception"


class MCurrenciesController {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/mcurrencies
    | Method: GET
    |--------------------------------------------------------------------------
    */

    async list (req, res, next) {
        try {
            const { query } = req

            const mcurrencies = await MCurrenciesModel.findAll({terms: query})
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: mcurrencies,
            })
        } catch (err) {
            next (err)
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/mcurrencies/:id
    | Method: GET
    |--------------------------------------------------------------------------
    */

    async detail (req, res, next) {
        try {
            const currency_id = req.params.id

            const mcurrency_detail = await MCurrenciesModel.mCurrencyDetail(currency_id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: mcurrency_detail,
            })
        } catch (err) {
            next (err)
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/mcurrencies
    | Method: POST
    |--------------------------------------------------------------------------
    */

    async save (req, res, next) {
        try {
            const item = req.body

            const result = await MCurrenciesModel.createMCurrency(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: result,
            })
        } catch (err) {
            next (err)
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/mcurrencies/:id
    | Method: PUT
    |--------------------------------------------------------------------------
    */

    async update (req, res, next) {
        try {
            const item = req.body
            item.currency_id = req.params.id

            const result = await MCurrenciesModel.updateMCurrency(item)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: result,
            })
        } catch (err) {
            next (err)
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/mcurrencies/check-exists
    | Method: GET
    |--------------------------------------------------------------------------
    */

    async checkExists (req, res, next) {
        try {
            const response = {}
            const params = {
                name: req.query.name,
                type: 'name'
            }

            const result = await MCurrenciesModel.checkExists(params)
            if(result){
                response.message = Exception.COMMON.VALUE_EXISTS
                response.data = true
            } else {
                response.message = Exception.COMMON.VALUE_NOT_EXISTS
                response.data = false
            }

            return res.jsonSuccess({
                message: Exception.getMessage(response.message, {field: req.query.name}),
                data: response.data,
            })
        } catch (err) {
            next (err)
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/mcurrencies/:id
    | Method: DELETE
    |--------------------------------------------------------------------------
    */

    async delete (req, res, next) {
        try {
            const id = req.params.id

            await MCurrenciesModel.softDelete(id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: id,
            })
        } catch (err) {
            next (err)
        }
    }
}

export default new MCurrenciesController()