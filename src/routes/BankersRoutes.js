import express from "express"

import BankersController from "../controllers/bankers/BankersController"

const router = express.Router()

router.get("/", BankersController.index)
// router.post("/", BankersController.save)
// router.delete("/:id", BankersController.delete)
// router.get("/:id", BankersController.detail)


export default router