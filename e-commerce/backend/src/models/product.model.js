const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
   title : {
    type : String,
    required : true,
   },
   image : {
     type : String,
     required : true
   },
   description : {
    type : String,
     required : true

   },
   category : {
    type : String
   },
   price : {
    type : String
   }
})


const productModel = mongoose.model("Product", productSchema)
module.exports = productModel