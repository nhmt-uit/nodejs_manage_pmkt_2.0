import AuthModel, { TYPE } from "../../models/AuthModel"
import Authentication from "../../utils/auth/Authentication"
import Session from "../../utils/Session"
import Exception from "../../utils/Exception"

class AuthController {
    async login (req, res, next) {
        try {
            const result = await AuthModel.login(req.body.username, req.body.password)

            if (result.status) {
                const userInfo = result.payload
                const token = Authentication.getToken({_id: userInfo._id, username: userInfo.username})
                const refresh_token = Authentication.getRefreshToken({_id: userInfo._id, username: userInfo.username})
                Session.set("token", token)
                Session.set("refresh_token", refresh_token)
                Session.set("user", userInfo)
                return res.jsonSuccess({
                    message: Exception.getMessage(Exception.AUTH.LOGIN_SUCCESS),
                    data: Session.get("user"),
                    token: token,
                    refresh_token: refresh_token
                })
            } else {
                let message = Exception.getMessage(Exception.AUTH.LOGIN_FAIL)
                if (result.type === TYPE.ACCOUNT_LOCK) message = Exception.getMessage(Exception.AUTH.ACCOUNT_LOCK)
                return res.jsonError({
                    code: 400,
                    message: message,
                })
            }
        } catch (err) {
            next(err)
        }
    }

    logout (req, res, next) {
        try {
            Session.destroy()
            return res.jsonSuccess({
                message: Exception.getMessage(Exception.AUTH.LOGOUT_SUCCESS)
            })
        } catch (err) {
            next(err)
        }
        
    }

    refreshToken (req, res, next) {
        try {
            const { refresh_token } = req.body
            const current_refresh_token = Session.get("refresh_token")
            const userInfo = Session.get("user")
            if (userInfo && refresh_token === current_refresh_token && Authentication.verifyRefreshToken(refresh_token)) {
                const token = Authentication.getToken({_id: userInfo._id, username: userInfo.username})
                Session.set("token", token)

                return res.jsonSuccess({
                    message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS),
                    token: token
                })
            } else {
                return res.jsonError({
                    code: 401,
                    message: Exception.getMessage(Exception.AUTH.UNAUTHORIZED)
                })
            }
        } catch (err) {
            next(err)
        }
    }

    checkSecureCode (req, res, next) {
        try {
            let secure_codes = req.body.secure_codes
            const userInfo = Session.get("user")
            let isValid = false
            if (secure_codes && secure_codes.length && userInfo) {
                secure_codes = JSON.parse(secure_codes)
                const secure_code = String(userInfo.secure_code)
                isValid = true
                secure_codes.forEach(item => {
                    const charAtPosition = secure_code.charAt(Number(item.position))
                    if (charAtPosition === "" || charAtPosition !== String(item.value)) isValid = false
                })
            }
            
            if (isValid) {
                return res.jsonSuccess({
                    message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS)
                })
            } else {
                return res.jsonError({
                    code: 400,
                    message: Exception.getMessage(Exception.AUTH.INVALID_SECURE_CODE)
                })
            }
        } catch (err) {
            next(err)
        }
    }

    changeSecureCode (req, res, next) {
        try {
            return res.jsonSuccess({

            })
            // let secure_codes = req.body.secure_codes
            // const userInfo = Session.get("user")
            // let isValid = false
            // if (secure_codes && secure_codes.length && userInfo) {
            //     secure_codes = JSON.parse(secure_codes)
            //     const secure_code = String(userInfo.secure_code)
            //     isValid = true
            //     secure_codes.forEach(item => {
            //         const charAtPosition = secure_code.charAt(Number(item.position))
            //         if (charAtPosition === "" || charAtPosition !== String(item.value)) isValid = false
            //     })
            // }
            
            // if (isValid) {
            //     return res.jsonSuccess({
            //         message: Exception.getMessage(Exception.COMMON.REQUEST_SUCCESS)
            //     })
            // } else {
            //     res.jsonError({
            //         code: 400,
            //         message: Exception.getMessage(Exception.AUTH.INVALID_SECURE_CODE)
            //     })
            // }
        } catch (err) {
            next(err)
        }
    }


    
}

export default new AuthController()