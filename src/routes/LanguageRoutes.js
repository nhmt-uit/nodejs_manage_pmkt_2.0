import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"
import LanguagesController from "../controllers/languages/LanguagesController"
import LanguagesValidator from "../controllers/languages/LanguagesValidator"

const router = express.Router()

router.get("/", LanguagesController.listData)
router.get("/code", LanguagesController.dataByCode)
router.post("/", LanguagesController.create)
router.put("/:id", LanguagesController.update)
router.delete("/:id",LanguagesController.delete)


export default router