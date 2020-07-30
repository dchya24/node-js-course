const Product = require("../models/product")

exports.getProductsPage = (req, res, next) => {
  Product.findAll()
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

  req.user.createProduct({
    title: title,
    description: description,
    price: price,
    imageUrl: image
  })
  .then(result => {
    res.redirect("/admin/add-product")
  })
  .catch(err => {
    res.send(err)
  })
}

exports.postEditProduct = (req, res, next) => {
  const title = req.body.title
  const description = req.body.description
  const price = req.body.price
  const image = req.body.image

  Product.findByPk(req.body.id)
  .then(product => {
    product.title = title
    product.description = description
    product.price = price
    product.imageUrl = image
    
    return product.save()
  })
  .then(result => {
    res.redirect("/admin/products")
  })
  .catch(err => res.send(err))
}

exports.postDeleteProduct = (req, res, next) => {
  Product.findByPk(req.body.id)
  .then(product => {
    return product.destroy()
  })
  .then(result => {
    res.redirect("/admin/products")
  })
  .catch(err => res.send(err))
}