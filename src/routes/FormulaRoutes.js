import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"
import FormulasController from "../controllers/formulas/FormulasController"
import FormulasValidator from "../controllers/formulas/FormulasValidator"

const router = express.Router()

router.get("/", FormulasController.list)
router.get("/:id", FormulasController.detail)
router.post("/", FormulasController.save)
router.put("/:id", FormulasController.update)
router.delete("/:id",FormulasController.delete)


export default router