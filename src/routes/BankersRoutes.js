import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"

import BankersController from "../controllers/bankers/BankersController"
import BankersValidator from "../controllers/bankers/BankersValidator"

const router = express.Router()

router.get("/", BankersController.listBankers)
router.post("/host", ValidatorHandling(BankersValidator.postCreateUpdateHostBanker), BankersController.createHostBanker)
router.put("/host/:id", ValidatorHandling(BankersValidator.postCreateUpdateHostBanker),BankersController.updateHostBanker)
router.delete("/host/:id", ValidatorHandling(BankersValidator.deleteHostBanker),BankersController.deleteHostBanker)


export default router