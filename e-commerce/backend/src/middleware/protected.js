const jwt = require("jsonwebtoken")
const config = require("../config/config")
const userModel = require("../models/user.model")

async function protected(req , res, next) {
    try {
       
        const token = req.headers?.authorization?.split(" ")[1]
        
        if(!token){
            return res.status(401).json({message : "unauthorized user"})
        }


        const decode = await jwt.verify(token , config.JWT_SECRET)

        const user = await userModel.findById(decode.id)

        if(!user){
            return res.status(401).json({message : "unauthorized user"})
        }

        req.userId = decode.id

        next()

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message :"internal server error", error :error.message })
        
    }
}


module.exports = protected