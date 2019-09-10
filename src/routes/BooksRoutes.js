import express from "express"

import BooksController from "../controllers/books/BooksController"

const router = express.Router()

router.get("/", BooksController.listBooks)

export default router