import { check } from "express-validator"

const AccountValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/accounts
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postCreateAccount: [
        check("email")
            .isLength({ min: 5 }).withMessage("must be at least 5 chars long")
            .isEmail().withMessage("have to email"),
        check("sub_email")
            .isLength({ min: 5 }).withMessage("must be at least 5 chars long")
            .isEmail().withMessage("have to email"),
    ]
};

export default AccountValidator