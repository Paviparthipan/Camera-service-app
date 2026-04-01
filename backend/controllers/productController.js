import Product from '../models/Products.js'

export const createProduct = async (req, res, next) => {

    const { name, brand, category, price, gst } = req.body;

    if (!name || !brand || !category || !price || !gst) {
        const err = new Error("please enter all credential")
        err.status = 400;
        return next(err)
    }


    const data = await Product.create({
        name,
        brand,
        category,
        price,
        gst
    })

    res.status(201).json({
        message: "product added",
        data
    })



}


export const productList = async (req, res, next) => {
    try {
        const { category } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        const product = await Product.find(filter);

        res.status(200).json({ message: "product get successfull", product })

    } catch (error) {
        next(error)
    }

}


