import express from "express"

import AuthHandling from "../middlewares/AuthHandling"

import UserRoutes from "./UserRoutes"
import AuthRoutes from "./AuthRoutes"
import FormulaGroupRoutes from "./FormulaGroupRoutes"

const router = express.Router()


router.use("/api/v1/users", AuthHandling, UserRoutes)
router.use("/api/v1/formula-groups", AuthHandling, FormulaGroupRoutes)
router.use("/api/v1/auth", AuthRoutes)


export default router