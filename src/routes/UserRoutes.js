import express from "express"


import ValidatorHandling from "../middlewares/ValidatorHandling"

import UsersController from "../controllers/users/UsersController"
import UserValidator from "../controllers/users/UsersValidator"

const router = express.Router()

router.get("/", ValidatorHandling(UserValidator.postCreateUser), UsersController.index)
router.post("/", ValidatorHandling(UserValidator.postCreateUser), UsersController.save)
router.delete("/:id", UsersController.delete)
router.get("/:id", UsersController.detail)


export default router