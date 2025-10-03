const express = require("express")

let router = express.Router()


router.get("/login",(req, res)=>{
    res.send("login route")
})


router.post("/register",(req, res)=>{
    res.send("login route")
})


module.exports = router