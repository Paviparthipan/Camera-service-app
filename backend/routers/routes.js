import express from "express";
import { adminReg, adminLogin, refreshToken } from "../controllers/adminController.js";

const router = express.Router();


router.post("/admin/login", adminLogin);
router.post("/refresh-token", refreshToken)
router.post("/admin/register", adminReg);



export default router;