import NoticesModel from "../../models/NoticesModel"
import Exception from "../../utils/Exception";

class NoticesController {
    async list(req, res, next) {
        try {
            const query = req.query
            const language_id = req.query.language_id
            let result = await NoticesModel.findAll(language_id, query)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async detail(req, res, next) {
        try {
            const id = req.params.id
            let result = await NoticesModel.find_id(id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async save(req, res, next) {
        try {
            const data = {
                name: req.body.name,
                type: req.body.type,
                contents: req.body.contents,
            };
            const result = await NoticesModel.createNotices(data)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_CREATE_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async update(req, res, next) {
        try {
            
            const temp = JSON.parse(req.body.contents)
            const data = {
                id : req.params.id,
                name: req.body.name,
                type: req.body.type,
                contents: temp,
            }
            console.log(data)
            let result = await NoticesModel.updateNotice(data)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_UPDATE_SUCCESS),
                data: result

            })
        } catch (err) {
            next(err)
        }
    }
    async delete(req, res, next) {
        try {
            const id = req.params.id
            let data = await NoticesModel.delete(id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.ITEM_DELETE_SUCCESS),
                data: data
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new NoticesController()