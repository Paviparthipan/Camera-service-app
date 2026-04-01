import mongoose from "mongoose";

const billSchema = mongoose.Schema({

    customerName: String,
    phone: String,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "serviceMan"
    },

    items: [
        {
            name: String,
            price: Number,
            gst: Number,
            qty: Number,
            total: Number
        }
    ],
    totalAmount: Number



}, { timestamps: true })


const Bill = mongoose.model("Bill", billSchema)

export default Bill