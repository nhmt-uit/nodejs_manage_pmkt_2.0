import BooksModel from "../../models/BooksModel"
import ExceptionConfig from "../../configs/ExceptionConfig"

class BooksController {
    async list (req, res, next) {
        try {
            const query = req.query

            const books = await BooksModel.findAll(query)
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data: books,
            })
        } catch (err) {
            next (err)
        }
    }
}

export default new BooksController()