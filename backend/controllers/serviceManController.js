
import serviceUser from "../models/serviceManModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const createServiceMan = async (req, res, next) => {


    if (req.user.role !== "admin") {
        return res.status(401).json({ message: "Not Authorized" })
    }


    try {
        const { name, userName, position, userNum, password } = req.body;

        if (!name || !userName || !userNum || !position || !password) {
            const err = new Error("enter all credentials")
            err.status = 400
            return next(err)
            // return res.status(400).json({
            //     message:"enter all credentials"
            // })
        }

        if (password.length < 8) {
            const err = new Error("Password must be at least 8 characters")
            err.status = 400
            return next(err)

            //  return res.status(400).json({
            //     message:"Password must be at least 8 characters"
            // })
        }
        const existUser = await serviceUser.findOne({ $or: [{ name }, { userName }, { userNum }] })
        if (existUser) {

            if (existUser.name === name) {
                const err = new Error("Name already taken")
                err.status = 400
                return next(err)
                //      return res.status(400).json({
                //     message:"Name already taken"
                // })
            }
            if (existUser.userName === userName) {
                const err = new Error("user name already taken")
                err.status = 400
                return next(err)
                //      return res.status(400).json({
                //     message:"user name already taken"
                // })
            }
            if (existUser.userNum === userNum) {
                const err = new Error("user number already taken")
                err.status = 400
                return next(err)
                //      return res.status(400).json({
                //     message:" number already taken"
                // })
            }
        }

        const hashpwd = await bcrypt.hash(password, 10)

        const user = await serviceUser.create(
            {
                name,
                userName,
                position,
                userNum,
                password: hashpwd
            })

        res.status(201).json({
            message: "user created successfully",
            user

        })

    } catch (error) {

        if (error.code === 11000) {


            return res.status(400).json({
                message: "user already taken"
            });
        }

        next(error)
    }

}

export const getServiceMan = async (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(401).json({ message: "Not Authorized" })
    }

    const data = await serviceUser.find()
    if (!data) {
        res.status(400).json({
            message: "no user found"
        })

    }
    res.status(200).json({

        data
    })
}

export const deleteServiceman = async (req, res, next) => {

    const { id } = req.body

    const existUser = await serviceUser.findById(id)

    if (!existUser) {
        const err = new Error("User not Found")
        err.status = 400
        return next(err)
    }
    await serviceUser.findByIdAndDelete(id)
    res.status(201).json({
        message: "user removed successfully"
    })


}

export const editServiceman = async (req, res, next) => {

    try {
        const { id } = req.params

        const { name, userName, position, userNum, password } = req.body
        const hashpwd = await bcrypt.hash(password, 10)
        const updateUser = await serviceUser.findByIdAndUpdate(
            id,
            {
                name,
                userName,
                position,
                userNum,
                password: hashpwd
            },
            { returnDocument: 'after' }
        )

        if (!updateUser) {
            const err = new Error("user not found")
            err.status = 404;
            return next(err)
        }
        res.status(200).json({
            message: "updated successfully"
        })
    } catch (error) {

    }


}


export const serviceManLogin = async (req, res, next) => {

    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            const err = new Error("Enter all credentials")
            err.status = 400;
            return next(err)
        }
        const user = await serviceUser.findOne({ userName });

        if (!user) {
            const err = new Error("user not found")
            err.status = 400;
            return next(err)
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const err = new Error("Password not match");
            err.status = 400
            return next(err)
        }

        user.active = true;
        await user.save()

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_SERVICE,
            { expiresIn: "1h" }

        );

        res.status(200).json({
            message: "login success",
            token,
            userData: {
                id: user._id,
                name: user.name,
                num: user.userNum,
                active: user.active
            }
        })

    } catch (error) {
        next(error)
    }


}

export const serviceManLogout = async (req, res, next) => {
    try {
        const { id } = req.body;
       
        const user = await serviceUser.findById(id);

        if (user) {
            user.active = false;
            await user.save()
        }
        res.json({ message: "logout success" })
    } catch (error) {
        next(error)
    }
}

