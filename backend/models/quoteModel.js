import mongoose from "mongoose";
// import serviceUser from "./serviceManModel,js";

const quoteSchema = new mongoose.Schema({

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


const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;