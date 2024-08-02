import express from "express"
import verifyToken from "../middleware/verifyToken.js"
import { addFarm, getFarms, getUsersByFarmLocation } from "../controllers/farm.controller.js"
const router = express.Router()

router.post("/add-farm" , verifyToken, addFarm)
router.get("/get-farms/:id" , verifyToken , getFarms)
router.get("/get-users-of-farm/:location" , verifyToken , getUsersByFarmLocation)

export default router