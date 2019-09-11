import express from "express"


import ValidatorHandling from "../middlewares/ValidatorHandling"

import LanguagesController from "../controllers/formula-groups/FormulaGroupsController"
import LanguagesValidator from "../controllers/formula-groups/FormulaGroupsValidator"

const router = express.Router()

router.get("/", LanguagesController.listData)


// router.get("/:id", FormulaGroupsController.dataById)


// router.post("/",  FormulaGroupsController.create)
// router.post("/by-banker/:id",ValidatorHandling(FormulaGroupsValidator.postAddByBanker),FormulaGroupsController.addByBanker)
// router.put("/:id",  FormulaGroupsController.update)

// router.delete("/:id",  FormulaGroupsController.delete)
// router.delete("/by-banker/:id",  FormulaGroupsController.deleteByBanker)

export default router