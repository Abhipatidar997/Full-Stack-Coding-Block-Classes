const express = require("express")

let router = express.Router()


// router.get("/register",(req,res)=>{
//     // console.log(req.query)
//     let {username , email, password} = req.query

//     console.log("name ===>",username);
//     console.log("email ===>",email);
//     console.log("password ===>",password);
    
//     res.send("register successful")
// })



router.post("/register",(req,res)=>{
    console.log(req.body)
    let {username , email, password} = req.body

    console.log("name ===>",username);
    console.log("email ===>",email);
    console.log("password ===>",password);
    
    res.send("register successful")
})

module.exports = router