import { uniqBy as _uniqBy } from "lodash"
import LanguagesModel from "../../models/LanguagesModel"
import ExceptionConfig from "../../configs/ExceptionConfig"
import HashPassword from "../../utils/HashPassword"
import Session from "../../utils/Session"
import { Mongoose } from "mongoose"
import FormulasModel from "../../models/FormulasModel"
import Exception from "../../utils/Exception";


class LanguagesController {
    async listData(req, res, next) {
        try {
            let formulaGroup = await LanguagesModel.findAll()
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                data: formulaGroup
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new LanguagesController()