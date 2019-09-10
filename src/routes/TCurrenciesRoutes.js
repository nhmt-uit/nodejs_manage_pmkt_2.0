import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"

import TCurrenciesController from "../controllers/t_currencies/TCurrenciesController"
import TCurrenciesValidator from "../controllers/t_currencies/TCurrenciesValidator"

const router = express.Router()

router.get("/", TCurrenciesController.listTCurrencies)
router.post("/",)

export default router