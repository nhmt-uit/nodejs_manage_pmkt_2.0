import NoticesModel from "../../models/NoticesModel"
import Exception from "../../utils/Exception";

class NoticesController {
    async listData(req, res, next) {
                const language_id = req.query.language_id
        try {
            let result = await NoticesModel.findAll(language_id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async dataById(req, res, next) {
        const id = req.params.id
        try {
            let result = await NoticesModel.find_id(id)
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    async create(req, res, next) {
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