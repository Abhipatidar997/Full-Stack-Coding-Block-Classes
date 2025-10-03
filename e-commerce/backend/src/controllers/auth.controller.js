const productModel = require("../models/product.model");

module.exports.indexController = async function (req, res) {
    try {

        const products = await productModel.find().populate("author")

        if(products.length === 0){
           return res.status(200).json({message : "products data not found"})
        }

        res.status(200).json({message : "products data found" , products})
    
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "internal server error" , error : error.message})
       
    }
}