import express from "express"


import ValidatorHandling from "../middlewares/ValidatorHandling"

import UsersController from "../controllers/users/UsersController"
import UserValidator from "../controllers/users/UsersValidator"

const router = express.Router()

router.get("/check-exists/", UsersController.checkExist)

router.get("/", ValidatorHandling(UserValidator.postCreateUser), UsersController.list)
router.get("/members", ValidatorHandling(UserValidator.postCreateUser), UsersController.detailUsers)
router.get("/sub-users/", ValidatorHandling(UserValidator.postCreateUser), UsersController.detailSubUsers)

router.post("/", ValidatorHandling(UserValidator.postCreateUser), UsersController.save)
router.delete("/:id", UsersController.delete)
// router.get("/:id", UsersController.detail)


export default router