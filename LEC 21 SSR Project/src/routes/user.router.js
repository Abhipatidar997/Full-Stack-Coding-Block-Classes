const express = require("express")
const userController = require("../controllers/user.controller")
const router = express.Router()
const protected = require("../middleware/protected")
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



router.get("/login",userController.loginGetController)
router.post("/login",userController.loginPostController)
router.get("/register",userController.registerGetController)
router.post("/register", userController.registerPostController)
router.get("/logout", userController.logoutController)
router.get("/profile/:userId",protected , userController.profileController )
router.get("/profile/update/:userId", protected , userController.getUpdateController)
router.post("/profile/update/:userId", protected , upload.single("profile") ,userController.postUpdateController)

module.exports = router