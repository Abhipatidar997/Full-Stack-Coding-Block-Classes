const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String ,
        required : true,
        unique : true,
    },
    profile : {
        type : String,
        default : "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    password : {
        type : String ,
        required : true
    }
})


const userModel = mongoose.model("User", userSchema)
module.exports = userModel