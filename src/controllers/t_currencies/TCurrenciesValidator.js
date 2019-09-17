import { check } from "express-validator"

import TCurrenciesModel from "../../models/MCurrenciesModel"
import Exception from "../../utils/Exception"

const TCurrenciesValidator = {

    saveConfig: [
        check('type')
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .not().isEmpty().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
    ],

}

export default TCurrenciesValidator