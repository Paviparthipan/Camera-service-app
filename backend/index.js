import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import { errorHandler } from "./middleware/errorMiddleware.js";
import router from "./routers/routes.js";
import serviceManRoutes from "./routers/serviceManRoute.js";
import cors from "cors"
import productRoute from "./routers/productRoute.js";
import quoteBill from "./routers/quoteBillRoute.js";


dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({
     origin: "https://camera-service-app.vercel.app",
  credentials: true
}))
connectDB();

app.use("/camapp", router)
app.use("/camapp", serviceManRoutes)
app.use("/camapp", productRoute)
app.use("/camapp", quoteBill)

app.use(errorHandler)


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);

})