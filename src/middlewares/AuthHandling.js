import ExceptionConfig from "../configs/ExceptionConfig"
import AuthConfig from "../configs/AuthConfig"
import Authentication from "../utils/auth/Authentication"
import Session from "../utils/Session"

export default (req, res, next) => {
    // Skip authentication
    if (AuthConfig.AUTH_ENABLE === false) return next()

    const token = req.headers["x-access-token"]
    if (token && Session.get("token") && token === Session.get("token")) {
        // verifies secret and checks exp
        if (Authentication.verifyToken(token)) return next()
    }
    res.jsonError({
        code: 401,
        message: ExceptionConfig.AUTH.UNAUTHORIZED
    })
}
