import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { createProduct , productList} from '../controllers/productController.js';



const productRoute = express.Router();

productRoute.post("/create-product", authMiddleware, createProduct);
productRoute.get("/productList", productList)




export default productRoute;