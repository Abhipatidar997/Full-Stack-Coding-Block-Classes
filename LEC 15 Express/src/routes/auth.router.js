const express = require("express")

let router = express.Router()


router.get("/", (req, res)=>{
    res.send("home route")
})


module.exports = router