import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"
import LanguagesController from "../controllers/languages/LanguagesController"
import LanguagesValidator from "../controllers/languages/LanguagesValidator"

const router = express.Router()

router.get("/", LanguagesController.list)
router.get("/code", LanguagesController.detail)
router.post("/", LanguagesController.save)
router.put("/:id", LanguagesController.update)
router.delete("/:id",LanguagesController.delete)


export default router