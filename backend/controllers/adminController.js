
import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const adminReg = async (req, res, next) => {


    try {

        const { userName, password } = req.body
        const exist = await Admin.findOne()

        if (exist) {
            const err = new Error("Sorry you can create one admin!!!")
            const status = 400
            return next(err)
        }

        const hashedpwd = await bcrypt.hash(password, 10)

        const admin = await Admin.create({
            userName,
            password: hashedpwd
        })

        res.status(201).json({
            message: "Superadmin created succeddfully",
            admin
        })
    } catch (err) {
        next(err)
    }
};


export const adminLogin = async (req, res, next) => {
    try {

        const { userName, password } = req.body;


        const admin = await Admin.findOne({ userName });

        if (!admin) {
            const err = new Error("Invalid cradentials")
            err.status = 401
            return next(err)

        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            const err = new Error("Invalid credentials")
            err.status = 401
            return next(err)
        }

        const accessToken = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "login successfully",
            accessToken,
            refreshToken
        })



    } catch (err) {
        next(err)
    }
}

export const refreshToken = (req, res, next) => {

    const { token } = req.body;

    if (!token) {
        const err = new Error("no token provided")
        err.status = 401;
        return next(err);
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {

        if (err) {
            const err = new Error("Invalid token");
            err.status = 403;
            return next(err)
        }


        const accessToken = jwt.sign(
            { id: decoded.id, role: decoded.role },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )
        res.json({ accessToken })
    })
}

