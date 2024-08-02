import express from "express"
import verifyToken, { verifyAdmin } from "../middleware/verifyToken.js"
import { addToOrderHistory, getAllActiveOrders, getAllOrders, getAllOrdersAdmin, getCurrentGroupOrder, getPreviousGroupOrder, updateOrder } from "../controllers/order.controller.js"
const router = express.Router()

router.post("/add-to-order-history" , verifyToken, addToOrderHistory)
router.get("/fetch-orders/:id" , verifyToken , getAllOrders)
router.get("/fetch-all-orders" , verifyAdmin , getAllOrdersAdmin)
router.post("/update-order/:id" , verifyAdmin , updateOrder)
router.get("/fetch-active-orders/:id" , verifyToken , getAllActiveOrders)
router.get("/get-current-group-order/:groupName" , verifyToken , getCurrentGroupOrder)
router.get("/get-previous-group-order/:groupName" , verifyToken , getPreviousGroupOrder)

export default router