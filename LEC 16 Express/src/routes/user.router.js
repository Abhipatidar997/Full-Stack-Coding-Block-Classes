const express = require('express')

let router = express.Router()

// router.get ( "/register", (req, res) => {
//     // console.log(req.query)

//     let { Username, email, password } = req.query

//     console.log("Username:", Username);
//     console.log("Email:", email);
//     console.log("Password:", password);

//     res.send("User registration route")
//     })


router.get ( "/register", (req, res) => {
    console.log(req.body)

    let { username, email, password } = req.body

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    res.send("User registration route")
    })

module.exports = router;