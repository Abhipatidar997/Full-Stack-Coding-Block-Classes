const express = require("express")


const router = express.Router()

let product = {
    name : "watch",
    price : 2000,
    model : "fireboltt"
}


router.get("/", (req, res)=>{
    res.render("index.ejs", {product : product})  
})


module.exports = router