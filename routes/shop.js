const router = require("express").Router()
const shopController = require("../controllers/shop")

router.get("/", shopController.getIndexPage)
router.get("/cart", shopController.getCartPage)
router.get("/products", shopController.getProductsPage)
router.get("/order", shopController.getOrderPage)
router.get("/product/:productId", shopController.getProductDetailPage)

router.post("/add-to-cart", shopController.postCart)

router.post("/cart/delete", shopController.deleteCart)

router.post("/order", shopController.createOrder)

module.exports = router