const Product = require("../models/product")
const objId = require("mongodb").ObjectId

exports.getProductsPage = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render("shop/products", {
      pageTitle: "Admin - Product",
      pathName: "admin-product",
      products: products
    })
  })
  .catch(err => {
    res.send(err)
  })
}

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Admin - Add Product",
    pathName: "admin-add-product"
  })
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title
  const description = req.body.description
  const price = req.body.price
  const image = req.body.image

  const product = new Product(title, price, description, image)

  product.save((result) => {
    res.redirect("/admin/add-product")
  })
}

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id
  const title = req.body.title
  const description = req.body.description
  const price = req.body.price
  const image = req.body.image
  const product = new Product(title, price, description, image, id)

  product.save((result) => {
    res.redirect("/admin/products")
  })
}

exports.postDeleteProduct = (req, res, next) => {
  productId = new objId(req.body.id)

  Product.destory({ _id: productId })
  .then(result => {
    res.redirect("/admin/products")
  })
  .catch(err => {
    res.send(err)
  })
}