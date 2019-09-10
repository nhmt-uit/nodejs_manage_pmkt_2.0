import BooksModel from "../../models/BooksModel"
import ExceptionConfig from "../../configs/ExceptionConfig"

class BooksController {
    async listBooks (req, res, next) {
        try {
            const books = await BooksModel.findAll()
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