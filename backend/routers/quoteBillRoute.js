import express from 'express'
import { allQuote, createQuote, delQuote, quoteList } from '../controllers/quotatonController.js'
import { allBills, createBill, delBill, getBill } from '../controllers/billController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const quoteBill = express.Router()

quoteBill.post("/create-quote", createQuote)
quoteBill.get("/quote-list", quoteList)
quoteBill.post("/create-bill", createBill)
quoteBill.get("/get-bill", getBill)
quoteBill.get("/all-bill", allBills)
quoteBill.get("/all-quote", allQuote)
quoteBill.delete("/delete-bill", authMiddleware, delBill)
quoteBill.delete("/delete-quote", authMiddleware, delQuote)

export default quoteBill;