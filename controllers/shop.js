const Product = require("../models/product")

exports.getIndexPage = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render("shop/index", {
      pageTitle: "Home",
      pathName: "home",
      products: products
    })
  })
  .catch(err => {
    res.send(err)
  })
}

exports.getCartPage = (req, res, next) => {
  req.user.getCart()
  .then(cart => {
    return cart.getProducts()
  })
  .then(products => {
    res.render("shop/cart", {
      pageTitle: "My Cart",
      pathName: "cart",
      products: products
    })
  })
  .catch(err => {
    res.send(err)
  })
}

exports.getProductsPage = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render("shop/products", {
      pageTitle: "Products",
      pathName: "products",
      products: products
    })
  })
  .catch(err => {
    res.send(err)
  })
}

exports.getProductDetailPage = (req, res, next) => {
  Product.findAll({
    where: {
      id: req.params.productId
    }
  })
  .then((product) => {
    res.render("shop/product-detail", {
      pageTitle: "Product Detail",
      pathName: "products",
      product: product[0]
    })
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  let fetchedCart

  req.user.getCart()
  .then(cart => {
    fetchedCart = cart
    return cart.getProducts({ where: { id: prodId }})
  })
  .then(products => {
    let product;
    if(products.length > 0){
      product = products[0]
    }
    let newQuantity = 1;

    if(product){

    }

    return Product.findByPk(prodId)
    .then(product => {
      return fetchedCart.addProduct(product, { 
        through: { quantity: newQuantity } 
      })
    })
    .catch(err => console.log(err))
  })
  .then(result => {
    res.redirect("/cart")
  })
  .catch(err => console.log(err))
}