import BooksModel from "../../models/BooksModel"
import Exception from "../../utils/Exception"

class BooksController {
    async list (req, res, next) {
        try {
            const { query } = req
            const books = await BooksModel.findAll({terms: query})
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: books,
            })
        } catch (err) {
            next (err)
        }
    }
}

export default new BooksController()