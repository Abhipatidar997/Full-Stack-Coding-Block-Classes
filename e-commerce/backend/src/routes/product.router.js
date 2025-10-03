const express = require("express")
const router = express.Router()
const protected = require("../middleware/protected")
const productControllers = require("../controllers/product.controller")



router.post("/create", protected, productControllers.productCreateController)
// router.get("/update/:productId", protected , productControllers.getUpdateController)
router.patch("/update/:productId", protected , productControllers.productUpdateController)
router.delete("/delete/:productId", protected , productControllers.deletePostController)
router.get("/details/:productId", protected , productControllers.productDetailController )




module.exports = router