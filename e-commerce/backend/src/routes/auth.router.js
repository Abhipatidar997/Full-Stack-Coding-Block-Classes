const express = require("express")
const authControllers = require("../controllers/auth.controller")
const protected = require("../middleware/protected")
const router = express.Router()


router.get("/", protected, authControllers.indexController )



module.exports = router
