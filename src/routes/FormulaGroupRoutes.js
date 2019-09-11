import express from "express"


import ValidatorHandling from "../middlewares/ValidatorHandling"

import FormulaGroupsController from "../controllers/formula-groups/FormulaGroupsController"
import FormulaGroupsValidator from "../controllers/formula-groups/FormulaGroupsValidator"

const router = express.Router()

router.get("/", FormulaGroupsController.listData)
router.get("/:id", FormulaGroupsController.dataById)
router.post("/",ValidatorHandling(FormulaGroupsValidator.postCreate),FormulaGroupsController.create)
router.post("/by-banker/:id",ValidatorHandling(FormulaGroupsValidator.postAddByBanker),FormulaGroupsController.addByBanker)
router.put("/:id",  FormulaGroupsController.update)

router.delete("/:id",  FormulaGroupsController.delete)
router.delete("/by-banker/:id", ValidatorHandling(FormulaGroupsValidator.postDeleteByBanker) ,FormulaGroupsController.deleteByBanker)

export default router