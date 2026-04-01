import Bill from "../models/billModel.js";

export const createBill = async (req, res, next) => {
    const { customerName, phone, UserId, items, totalAmount } = req.body

    try {

        const bill = await Bill.create({
            customerName,
            phone,
            createdBy: UserId,
            items: items,
            totalAmount

        })




        res.json({
            bill
        })
    } catch (error) {
        next(error)
    }
}

export const getBill = async (req, res, next) => {
    const { UserId } = req.query
    try {
        const bill = await Bill.find({ createdBy: UserId }).populate("createdBy", "name")

        if (!bill) {
            const err = new Error("Bills not Found")
            err.status = 400
            return next(err)
        }

        res.json(bill)

    } catch (error) {
        next(error)
    }
}


export const allBills = async (req, res, next) => {
    try {
        const bill = await Bill.find().populate("createdBy", "name")
        res.json(bill)


    } catch (error) {
        next(error)
    }

}


export const delBill = async (req, res, next) => {

    const { id } = req.query;




    try {

        if (!id) {
            const err = new Error("This bill not in Db")
            err.status = 400;
            return next(err)
        }

        const bill = await Bill.findByIdAndDelete(id)


        res.status(200).json(
            {
                message: "deleted Successfull",
                bill
            }
        )



    } catch (error) {
        next(error)
    }
}