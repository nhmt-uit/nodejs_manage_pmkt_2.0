import { check } from "express-validator"

import Exception from "../../utils/Exception"

const AuthValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/auth/login
    | Method: POST
    |--------------------------------------------------------------------------
    */
	postLogin: [
        check("username")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
        check("password")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/auth/refresh-token
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postRefreshToken: [
        check("refresh_token")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/auth/check-secure-code
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postCheckSecureCode: [
        check("secure_codes")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
    ],

     /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/auth/change-secure-code
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postChangeSecureCode: [
        check("current_secure")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
        check("new_secure")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD)),
        check("re_new_secure")
            .exists().withMessage(Exception.getMessage(Exception.VALIDATION.REQUIRE_FIELD))
            .custom((value, { req }) => value === req.body.new_secure)
                .withMessage(Exception.getMessage(Exception.VALIDATION.NOT_SeeeAME, {field: "new secure code"})),
    ],
}

export default AuthValidator