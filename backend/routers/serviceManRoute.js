import express from 'express';
import { createServiceMan, deleteServiceman, editServiceman, getServiceMan, serviceManLogin, serviceManLogout } from '../controllers/serviceManController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const serviceManRoutes = express.Router();

serviceManRoutes.post("/create-serviceman", authMiddleware, createServiceMan)
serviceManRoutes.get("/serviceman-list", authMiddleware, getServiceMan)
serviceManRoutes.delete("/servicemanDelete", authMiddleware, deleteServiceman)
serviceManRoutes.put("/edit-serviceman/:id", authMiddleware, editServiceman)
serviceManRoutes.post("/ServiceMan-login", serviceManLogin)
serviceManRoutes.post("/ServiceMan-logout", serviceManLogout)



export default serviceManRoutes;