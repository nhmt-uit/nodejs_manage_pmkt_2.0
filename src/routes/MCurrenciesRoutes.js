import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"

import MCurrenciesController from "../controllers/m_currencies/MCurrenciesController"
import MCurrenciesValidator from "../controllers/m_currencies/MCurrenciesValidator"

const router = express.Router()

router.get("/", MCurrenciesController.listMCurrencies)
router.get("/:id", ValidatorHandling(MCurrenciesValidator.getMCurrenciesDetail), MCurrenciesController.mCurrencyDetail)
router.post("/", ValidatorHandling(MCurrenciesValidator.createMCurrency), MCurrenciesController.createMCurrency)
router.put("/:id", ValidatorHandling(MCurrenciesValidator.updateMCurrency), MCurrenciesController.updateMCurrency)
router.post("/check-exists", MCurrenciesController.checkExists)
router.delete("/:id", ValidatorHandling(MCurrenciesValidator.deleteMCurrency), MCurrenciesController.deleteMCurrency)

export default router