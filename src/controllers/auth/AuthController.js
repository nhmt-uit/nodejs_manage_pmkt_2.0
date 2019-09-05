import UsersModel from "../../models/UsersModel"
import ExceptionConfig from "../../configs/ExceptionConfig"
import HashPassword from "../../utils/HashPassword"
import Authentication from "../../utils/auth/Authentication"
import Session from "../../utils/Session"

class AuthController {
    login (req, res, next) {
        try {
            const user = {
                "email": req.body.email,
                "password": req.body.password
            }
            // const myToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE1NjcxNTQ4NTIsImV4cCI6MTU2NzE1NTc1Mn0.tESiC2D319_9CbuIDfBZpUIjdb7iNZBh35W0ZaoLBX8"
            // const token = Authentication.verifyToken(myToken)
            const token = Authentication.getToken(user)
            const refresh_token = Authentication.getRefreshToken(user)
            Session.set("token", token)
            Session.set("refresh_token", refresh_token)
            Session.set("user", { ...user, id: "5d6f71f58103e130a00ffad8" })
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data : {
                    token: token,
                    refresh_token: refresh_token
                }
            })
        } catch (err) {
            next(err)
        }
    }

    refreshToken (req, res, next) {
        const user = {
            "email": req.body.email,
            "password": req.body.password
        }

        try {
            
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                // data: { token, refresh_token}
                data : token
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new AuthController()