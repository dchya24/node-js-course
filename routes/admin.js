const router = require("express").Router()
const adminController = require("../controllers/admin")

router.get("/products", adminController.getProductsPage)

router.get("/add-product", adminController.getAddProductPage)
router.post("/add-product", adminController.postAddProduct)
router.post("/edit-product", adminController.postEditProduct)
router.post("/delete-product", adminController.postDeleteProduct)

module.exports = router