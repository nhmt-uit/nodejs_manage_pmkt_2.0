import express from "express"


import ValidatorHandling from "../middlewares/ValidatorHandling"

import UsersController from "../controllers/users/UsersController"
import UserValidator from "../controllers/users/UsersValidator"

const router = express.Router()

router.get("/check-exists/", UsersController.checkExist)

router.get("/", UsersController.list)
router.get("/members", UsersController.detailMembers)
router.get("/sub-users/", UsersController.detailSubUsers)
router.get("/generate-username",UsersController.generateUsername)
router.post("/", UsersController.save)
router.delete("/:id", UsersController.delete)
// router.get("/:id", UsersController.detail)


export default router