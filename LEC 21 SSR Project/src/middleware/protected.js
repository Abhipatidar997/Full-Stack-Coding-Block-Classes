const jwt = require("jsonwebtoken")
const config = require("../config/config")
const userModel = require("../models/user.model")

async function protected(req , res, next) {
    try {
        const token = req.session.token

        if(!token){
            return res.redirect("/users/login")
        }


        const decode = await jwt.verify(token , config.JWT_SECRET)

        const user = await userModel.findById(decode.id)

        if(!user){
            return res.redirect("/users/register")
        }

        req.userId = decode.id

        next()

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message :"internal server error", error :error.message })
        
    }
}


module.exports = protected