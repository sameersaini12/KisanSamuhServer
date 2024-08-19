import express from "express"
import { addCategory, createProduct, deleteProduct, getAllProducts, productDetails, sendPreSignedURLToUploadCategoryImage, updateProduct } from "../controllers/product.controller.js";
import { verifyAdmin } from "../middleware/verifyToken.js";
const router = express.Router()

router.post("/create-product", verifyAdmin , createProduct)
router.put("/update-product/:id" , verifyAdmin , updateProduct)
router.delete("/delete-product/:id" , verifyAdmin , deleteProduct)
router.post("/all-products" , getAllProducts)
router.get("/product-details/:id" , productDetails)
router.post("/get-url-for-category-image" , verifyAdmin, sendPreSignedURLToUploadCategoryImage)
router.post("/add-category" , verifyAdmin, addCategory)

export default router;