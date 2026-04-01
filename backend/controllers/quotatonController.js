import Quote from "../models/quoteModel.js";
import serviceUser from "../models/serviceManModel.js";

export const createQuote = async (req, res, next) => {

    const { customerName, phone, UserId, items, totalAmount } = req.body

    try {

        const quote = await Quote.create({
            customerName,
            phone,
            createdBy: UserId,
            items: items,
            totalAmount

        })
        res.json({
            quote
        })
    } catch (error) {
        next(error)
    }



}

export const quoteList = async (req, res, next) => {

    const { UserId } = req.query
    try {
        const quote = await Quote.find({ createdBy: UserId }).populate("createdBy", "name")

        if (!quote) {
            const err = new Error("Quotation not Found")
            err.status = 400
            return next(err)
        }
        res.json(quote)

    } catch (error) {
        next(error)
    }


}

export const allQuote = async (req, res, next) => {
    try {
        const quote = await Quote.find().populate("createdBy", "name ")
        res.json(quote)

    } catch (error) {
        next(error)
    }
}


export const delQuote = async (req, res, next) => {
    const { id } = req.query
    try {

        if (!id) {
            const err = new Error("Quotation not in db")
            err.status = 400;
            return next(err)
        }
        const quote = await Quote.findByIdAndDelete(id)

    } catch (error) {
        next(error)
    }


}