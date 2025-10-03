const express = require("express")
const router = express.Router()
const protected = require("../middleware/protected")
const postControllers = require("../controllers/post.controller")



router.get("/create", protected ,postControllers.getCreateController)
router.post("/create", protected, postControllers.postCreateController)
router.get("/update/:id", protected , postControllers.getUpdateController)
router.post("/update/:id", protected , postControllers.postUpdateController)
router.get("/delete/:id", protected , postControllers.deletePostController)



module.exports = router