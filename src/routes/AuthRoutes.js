import express from "express"


import ValidatorHandling from "../middlewares/ValidatorHandling"

import AuthController from "../controllers/auth/AuthController"
import AuthValidator from "../controllers/auth/AuthValidator"

const router = express.Router()

router.post("/login", ValidatorHandling(AuthValidator.postLogin), AuthController.login)
router.post("/logout", AuthController.logout)
router.post("/refresh-token", ValidatorHandling(AuthValidator.postRefreshToken), AuthController.refreshToken)
router.post("/check-secure-code", ValidatorHandling(AuthValidator.postCheckSecureCode), AuthController.checkSecureCode)
router.post("/change-secure-code", ValidatorHandling(AuthValidator.postChangeSecureCode), AuthController.changeSecureCode)

export default router