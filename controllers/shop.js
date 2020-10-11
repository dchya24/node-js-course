const Product = require("../models/product")

exports.getIndexPage = (req, res, next) => {
  Product.fetchAll()
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
  Product.fetchAll()
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
  Product.findById(req.params.productId)
  .then((product) => {
    res.render("shop/product-detail", {
      pageTitle: "Product Detail",
      pathName: "products",
      product: product
    })
  })
}

exports.getOrderPage = (req, res, next) => {
  req.user
    .getOrders({
      include: ['products']
    })
    .then(orders => {
      res.render("shop/order", {
        pageTitle: "Orders",
        pathName: 'order',
        orders: orders
      })
    })
    .catch(err => {
      res.send(err)
    })
  
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  let fetchedCart
  let newQty = 1


  req.user.getCart()
  .then(cart => {
    fetchedCart = cart
    return cart.getProducts({ where: { id: prodId } })
  })
  .then(products => {
    let product;
    if(products.length > 0){
      product = products[0]
    }

    if(product){
      const oldQty = product.cartItem.quantity
      newQty = oldQty + 1
      return product
    }

    return Product.findByPk(prodId)
    
  })
  .then(product => {
    console.log(product)

    return fetchedCart.addProduct(product, { 
      through: { quantity: newQty } 
    })
  })
  .then(result => {
    res.redirect("/cart")
  })
  .catch(err => console.log(err))
}

exports.deleteCart= (req, res,  next) => {
  const productId = req.body.productId

  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({
        where: { id: productId }
      })
    })
    .then(products => {
      const product = products[0]
      return product.cartItem.destroy()
    })
    .then(result => {
      res.redirect("/cart")
    })
    .catch(err => console.log(err))
}

exports.createOrder = (req, res, next) => {
  let fetchedCart
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart
      return cart.getProducts()
    })
    .then(products => {
      return req.user.createOrder()
      .then(order => {
        order.addProduct(products.map(product => {
          product.orderItem = { quantity: product.cartItem.quantity };
          return product
        }))
      })
      .catch(err => console.log(err))
    })
    .then(result => {
      return fetchedCart.setProducts(null)
    })
    .then(result => {
      res.redirect("/order")
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
}