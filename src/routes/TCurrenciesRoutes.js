import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"

import TCurrenciesController from "../controllers/t_currencies/TCurrenciesController"
import TCurrenciesValidator from "../controllers/t_currencies/TCurrenciesValidator"

const router = express.Router()

router.get("/", TCurrenciesController.listTCurrencies)
// router.post("/")
router.post("/save-config", ValidatorHandling(TCurrenciesValidator.saveConfig), TCurrenciesController.saveConfig)
router.put("/:id", ValidatorHandling(TCurrenciesValidator.updateTCurrencies), TCurrenciesController.updateTCurrencies)


export default router