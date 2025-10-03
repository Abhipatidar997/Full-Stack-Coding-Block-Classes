const express = require("express")
const authControllers = require("../controllers/auth.controller")
const router = express.Router()


router.get("/",authControllers.indexController )



module.exports = router