import express from "express"

import ValidatorHandling from "../middlewares/ValidatorHandling"
import NoticesController from "../controllers/notices/NoticesController"
import NoticesValidator from "../controllers/notices/NoticesValidator"

const router = express.Router()

router.get("/", NoticesController.listData)
router.get("/:id", NoticesController.dataById)
router.post("/", NoticesController.create)
router.put("/:id", NoticesController.update)
router.delete("/:id",NoticesController.delete)


export default router