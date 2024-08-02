import express from "express"
const router = express.Router()
import { login, register, sendOtp, verifyOtp } from "../controllers/auth.controller.js";

router.post("/register" , register)
router.post("/login" , login)
router.post("/send-otp" , sendOtp)
router.post("/verify-otp" , verifyOtp)

export default router