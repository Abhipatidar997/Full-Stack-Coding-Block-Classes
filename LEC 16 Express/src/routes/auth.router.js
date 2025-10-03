const express = require("express")

const router = express.Router()


router.get("/:name", (req, res)=>{
    let {name} = req.params
    console.log(name);
    
    res.send(`Home route for ${name} `)
})



module.exports = router
