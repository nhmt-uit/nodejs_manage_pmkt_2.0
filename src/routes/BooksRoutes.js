import express from "express"

import BooksController from "../controllers/books/BooksController"

const router = express.Router()

router.get("/", BooksController.list)

export default router