const mongoose = require("mongoose")


const postSchema = mongoose.Schema({
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
   content : {
    type : String,
     required : true

   },
   tags : {
    type : String
   }
})


const postModel = mongoose.model("post", postSchema)
module.exports = postModel