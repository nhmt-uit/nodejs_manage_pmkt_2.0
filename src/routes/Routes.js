import express from "express"

import AuthHandling from "../middlewares/AuthHandling"

import UserRoutes from "./UserRoutes"
import AuthRoutes from "./AuthRoutes"
import FormulaGroupRoutes from "./FormulaGroupRoutes"
import LanguageRoutes from "./LanguageRoutes"
import NoticeRoutes from "./NoticeRoutes"
import FormulaRoutes from "./FormulaRoutes"
import AccountRoutes from "./AccountRoutes"
import BankersRoutes from "./BankersRoutes"
import BooksRoutes from "./BooksRoutes"
import MCurrenciesRoutes from "./MCurrenciesRoutes"
import TCurrenciesRoutes from "./TCurrenciesRoutes"
import AccountFormulaRoutes from './AccountFormulaRoutes'

const router = express.Router()

router.use("/api/v1/auth", AuthRoutes)
router.use("/api/v1/users", AuthHandling, UserRoutes)
router.use("/api/v1/bankers", AuthHandling, BankersRoutes)
router.use("/api/v1/books", AuthHandling, BooksRoutes)
router.use("/api/v1/mcurrencies", AuthHandling, MCurrenciesRoutes)
router.use("/api/v1/tcurrencies", AuthHandling, TCurrenciesRoutes)
router.use("/api/v1/formula-groups", AuthHandling, FormulaGroupRoutes)
router.use("/api/v1/formulas", AuthHandling, FormulaRoutes)
router.use("/api/v1/languages", AuthHandling, LanguageRoutes)
router.use("/api/v1/notices", AuthHandling, NoticeRoutes)
router.use("/api/v1/accounts", AuthHandling, AccountRoutes)
router.use("/api/v1/account-formula", AuthHandling, AccountFormulaRoutes)

export default router