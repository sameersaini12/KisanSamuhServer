import express from "express"
import verifyToken from "../middleware/verifyToken.js"
import { addFeedback } from "../controllers/feedback.controller.js"
const router = express.Router()

router.post("/add-feedback" , verifyToken, addFeedback)

export default router