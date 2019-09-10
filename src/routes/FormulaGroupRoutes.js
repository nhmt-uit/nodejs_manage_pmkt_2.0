import express from "express"


import ValidatorHandling from "../middlewares/ValidatorHandling"

import FormulaGroupsController from "../controllers/formula-groups/FormulaGroupsController"
import FormulaGroupsValidator from "../controllers/formula-groups/FormulaGroupsValidator"

const router = express.Router()

router.get("/", FormulaGroupsController.listData)
router.get("/:id", FormulaGroupsController.dataById)
router.post("/",  FormulaGroupsController.save)
router.put("/:id",  FormulaGroupsController.update)

router.delete("/:id",  FormulaGroupsController.delete)
router.delete("/by-banker/:id",  FormulaGroupsController.deleteByBanker)

export default router