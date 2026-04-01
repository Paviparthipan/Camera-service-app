import mongoose from "mongoose";

const serviceManSchema = new mongoose.Schema({

    name: {
        unique: true,
        required: true,
        type: String
    },
    userName: {
        unique: true,
        required: true,
        type: String
    },
    position: {
        type: String,
        required: true
    },
    userNum: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        default:'staff'
    },
    active: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
)

const serviceUser = mongoose.model("serviceMan", serviceManSchema)

export default serviceUser;