import { check } from "express-validator"
import UsersSchema from "../../models/UsersModel"

const UserValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/user
    | Method: POST
    |--------------------------------------------------------------------------
    */
	postCreateUser: [
        check('username')
            .custom( async value => {
                let isUnique = await UsersSchema.checkUniqueUsername(value);
                if(!isUnique){
                    return Promise.reject(value + ' is already in use')
                }
            })

        // check("email")
        //     .isLength({ min: 5 }).withMessage("must be at least 5 chars long")
        //     .isEmail().withMessage("have to email"),
        // check("sub_email")
        //     .isLength({ min: 5 }).withMessage("must be at least 5 chars long")
        //     .isEmail().withMessage("have to email"),
    ]
}

export default UserValidator