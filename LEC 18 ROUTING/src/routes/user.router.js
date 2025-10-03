const express = require("express")
const userController = require("../controllers/user.controller")
const router = express.Router()

router.use((req,res, next)=>{
    console.log("router level middleware");
    next()
})

router.post("/register",userController.registerController)
router.post("/login",userController.loginController)

module.exports = router

