import { getObjectURL, putObjectURL } from "../dbConnect/awsS3.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js"

const fetchImageAddresses = async (numberOfImages , nameOfProduct) => {
    let imageAddressList = []
    for(let i=1;i<=numberOfImages;i++) {
        const image_url = await getObjectURL(`product_images/${nameOfProduct}/image_${i}`);
        imageAddressList.push(image_url)
        // console.log("Address "+ image_url)
    }
    // console.log(imageAddressList)
    return imageAddressList
}

export const createProduct = async (req,res) => {
    try {
        const numberOfImages = req.body.numberOfImages
        const newProduct = new Product({
            title : req.body.title,
            brand : req.body.brand,
            about : req.body.about,
            technicalDetails : req.body.technicalDetails,
            features : req.body.features,
            howToUse : req.body.howToUse,
            additionalInformation : req.body.additionalInformation,
            categories : req.body.categories,
            price : req.body.price,
            discount : req.body.discount,
            image : await fetchImageAddresses(numberOfImages , req.body.title)
        });
        await newProduct.save();
        if(!newProduct) {
            return res.status(200).json({
                message : "Error occurs while adding new Product Category",
            })
        }
        res.status(200).json({
            message : "New Product has been added successfully",
            data : newProduct
        })
    }catch(err) {
        res.status(500).json({
            message : "Error Occured while creating a Product",
            error : err
        })
        console.log(err)
    }
}

export const updateProduct = async (req,res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set : req.body
            },
            {
                new : true
            }
        )

        res.status(200).json({
            message : "Product has been updated successfully",
            data : updatedProduct
        })
    }catch(err) {
        res.status(500).json({
            message : "Error Occured while updating a Product",
            error : err
        })
        console.log(err)
    }
}

export const deleteProduct = async (req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message : "Product has been deleted successfully",
        })
    }catch(err) {
        res.status(500).json({
            message : "Error Occured while deleting a Product",
            error : err
        })
        console.log(err)
    }
}

export const getAllProducts = async (req,res) => {
    try {
        const categories = JSON.parse(req.query.categories).toLowerCase()
        if(categories.length) {
            var productList = await Product.find({ categories : { $in : categories } })
        }else {
            var productList = await Product.find()
        }
        
        res.status(200).json({
            message : "Products has been fetched successfully",
            data : productList
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occured while fetching products",
            error : err
        })
    }
}

export const productDetails = async (req,res) => {
    try {
        const productInfo = await Product.find({_id : req.params.id})
        res.status(200).json({
            message : "Product Details has been fetched successfully",
            data : productInfo
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occured while fetching product details",
            error : err
        })
        console.log(err)
    }
}

export const sendPreSignedURLToUploadCategoryImage = async (req,res) => {
    try {
        const preSignedURL = await putObjectURL(req.body.fileName , req.body.contentType , req.body.folderPath)
        res.status(200).json({
            message : "Pre Signed URL generated to upload Category Image",
            data : preSignedURL
        })
    }catch(err) {
        res.status(500).json({
            message : "Uloading Category Image Failed",
            error : err
        })
        console.log(err)
    }
}

export const addCategory = async (req, res) => {
    try {
        const newProductCategory = new Category({
            title : req.body.title,
            image : await getObjectURL(`categories/images/${req.body.title}`)
        });
        await newProductCategory.save();

        if(!newProductCategory) {
            return res.status(200).json({
                message : "Error occurs while adding new Product Category",
            })
        }
        res.status(200).json({
            message : "New Product Category has been added successfully",
            data : newProductCategory
        })
    }catch(err) {
        res.status(500).json({
            message : "Adding new Product Category Failed",
            error : err
        })
        console.log(err)
    }
}