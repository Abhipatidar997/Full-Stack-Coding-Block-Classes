const { json } = require("express");
const productModel = require("../models/product.model");



module.exports.productCreateController = async (req,res)=>{
    try {
        
        const {title , description , image , price , category} = req.body

        if(!title || !description || !image || !price || !category){
            return res.status(400).json({message : "all fields are required"})
        }

        const userId = req.userId

        const product = await productModel.create({
            author : userId,
            title ,
            image , 
            description,
            price,
            category
        })

        res.status(201).json({message : "product created successfully" , product})

        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message :"internal server error", error :error.message })
                
    }
}




module.exports.productUpdateController = async (req ,res) => {
    try {
        const productId = req.params.productId
        const {title , description , image , category , price} = req.body

        const product = await productModel.findById(productId)

        product.title = title || product.title
        product.description = description || product.description
        product.image = image || product.image
        product.category = category || product.category
        product.price = price || product.price

        await product.save()

        res.status(200).json({message : "post update succcefully" , product})


    } catch (error) {
        console.log(error.message);
        res.status(500).json({message :"internal server error", error :error.message })
        
    }
}

module.exports.getUpdateController = async (req , res) => {
    try {
        const productId = req.params.productId

        if(!productId){
            return res.status(400).json({message : "productId is required"})
        }
        console.log(productId);
        
        const product = await productModel.findById(productId)

        if(!product){
            return res.status(400).json({message : "product not found"})
        }
        console.log(product);
        
        res.status(200).json({message : "product data found" , product})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message :"internal server error", error :error.message })
       
    }
}


module.exports.deletePostController = async (req ,res) => {
    try {
        const productId = req.params.productId

        await productModel.findByIdAndDelete(productId)

        res.status(200).json({message : "post deleted successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message :"internal server error", error :error.message })
       
    }
}


module.exports.productDetailController = async (req , res) => {
    try {
        const productId = req.params.productId

        if(!productId){
            return res.status(400).json({message : "productId is required"})
        }

        const product = await productModel.findById(productId)

        if(!product){
            return res.status(400).json({message : "product not found"})
        }

        res.status(200).json({message :"product detail found", product })


    } catch (error) {
        console.log(error.message);
        res.status(500).json({message :"internal server error", error :error.message })
       
    }
}