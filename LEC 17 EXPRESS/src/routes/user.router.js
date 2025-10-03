const express = require("express")


const router = express.Router()


router.post("/register", (req, res)=>{
    console.log(req.body);
    res.send("sab kuch thik chal rha hai ")    
})


module.exports = router