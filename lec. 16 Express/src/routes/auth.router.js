const express = require('express')

let router = express.Router()

router.get ( "/:name", (req, res) => {
    let name = req.params.name  // Extracting name from request parameters
  
  
  
    console.log(name)            
    res.send(`Auth home route for ${name}`)
})

module.exports = router