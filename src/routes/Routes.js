import express from "express"

import AuthHandling from "../middlewares/AuthHandling"

import UserRoutes from "./UserRoutes"
import AuthRoutes from "./AuthRoutes"
import AccountRoutes from "./AccountRoutes"
import BankersRoutes from "./BankersRoutes"
import BooksRoutes from "./BooksRoutes"
import MCurrenciesRoutes from "./MCurrenciesRoutes"

const router = express.Router()

router.use("/api/v1/users", AuthHandling, UserRoutes)
router.use("/api/v1/bankers", AuthHandling, BankersRoutes)
router.use("/api/v1/books", AuthHandling, BooksRoutes)
router.use("/api/v1/mcurrencies", AuthHandling, MCurrenciesRoutes)
router.use("/api/v1/auth", AuthRoutes)
router.use("/api/v1/accounts", AuthHandling, AccountRoutes)

export default router