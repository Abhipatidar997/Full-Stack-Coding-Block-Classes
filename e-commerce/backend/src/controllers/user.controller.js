const userModel = require("../models/user.model")
const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../config/config")
const upload = require("../services/imagekit")



module.exports.loginPostController = async function (req ,res) {

    try {
        const {email , password} = req.body

        if (!email) {
            return res.status(400).json({message : "email is required"})
        }
        if (!password) {
           return res.status(400).json({message : "password is required"})
        }

        const user = await userModel.findOne({email : email})

        if(!user){
            return res.status(400).json({message : "invalid credential"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
          return res.status(400).json({message : "invalid credential"})
        }

        const token = await jwt.sign({
            id : user._id ,
            username : user.username ,
            email : user.email
        },config.JWT_SECRET)

        delete user._doc.password

        res.status(200).json({message : "login successfully" , user , token})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "internal server error" , error : error.message})
       
    }
    
}




module.exports.registerPostController = async function(req, res) {
    try {
        
        const {username , email , password} = req.body


        if(!username){
            return res.status(400).json({message : "username must be required"})
        }

        if(!email){
            return res.status(400).json({message : "email must be required"})
        }

        if(!password){
            return res.status(400).json({message : "password must be required"})
        }

        const alreadyExist = await userModel.findOne({email : email})

        if(alreadyExist){
            return res.status(400).json({message : "email already exist"})
        }

        const hashedPass = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username : username,
            email : email,
            password : hashedPass
        })

        
        const token = await jwt.sign({

            id : user._id ,
            username : user.username ,
            email : user.email

        },config.JWT_SECRET)

        delete user._doc.password

        res.status(201).json({message : "register successful" , user , token})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "internal server error" , error : error.message})
        
    }
}


module.exports.logoutController = function (req, res) {
    try {
        req.session.destroy((err)=>{
            if(err){
                return res.redirect("/")
            }
            res.redirect("/users/login")
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "internal server error" , error : error.message})
       
    }
}


module.exports.profileController = async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await userModel.findById(userId)

        res.status(200).json({message : "user profile data" , user})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "internal server error" , error : error.message})
       
    }
}


module.exports.postUpdateController = async (req , res) => {
    try {
      
        const profile = req.file
        const {username} = req.body
        const userId = req.params.userId


        let profileUrl = null

        if(profile){
            const result = await upload(profile)
            console.log(result);
            profileUrl = result.url
        }

        let user = await userModel.findById(userId)

        user.username = username || user.username
        
        if(profileUrl){
            user.profile = profileUrl
        }

        await user.save()

        res.status(200).json({message : "profile update successfully" , user})

        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : "internal server error" , error : error.message})
     
    }
}