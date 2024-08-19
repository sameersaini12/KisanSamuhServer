import express from "express"
import verifyToken, { verifyAdmin } from "../middleware/verifyToken.js"
import { updateUser , deletUser, getAdmin, getAllUsers, getUsersStats, addAddress, getAddresss, getUserDetails, deleteAddress, updateRewardCoins } from "../controllers/user.contoller.js"
const router = express.Router()

router.put("/update/:id" , verifyToken , updateUser)
router.get("/get-user-details/:id" , verifyToken , getUserDetails)
router.delete("/delete/:id" , verifyAdmin , deletUser)
router.get("/get-admin/:id" , verifyAdmin , getAdmin)
router.get("/get-users", verifyAdmin , getAllUsers)
router.get("/user-stats" , verifyAdmin , getUsersStats)
router.post("/add-address/:id" , verifyToken , addAddress)
router.get("/get-address/:id" , verifyToken , getAddresss)
router.post("/delete-address/:id", verifyToken, deleteAddress)
router.post("/update-user-coins/:id" , verifyToken , updateRewardCoins)
// router.get("/get-coins",verifyToken , getRewardCoins)

export default router