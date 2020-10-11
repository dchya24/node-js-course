const getDb = require('../utils/database').getDb;
const mongodb = require("mongodb")
class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new mongodb.ObjectId(id)
  }

  save(cb) {
    const db = getDb()
    let data;

    if(this.id){
      data = db.collection("products")
        .updateOne({ _id: this.id }, { $set: this })

    }else {
      data = db.collection("products").insertOne(this)
    }

    return data.then(result => {
        cb(result)
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb()
    const products = db.collection("products")
    
    return products.find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb()
    
    return db.collection("products")
    .find({ _id : new mongodb.ObjectId(id) })
    .next()
    .then(product => {
      return product
    })
    .catch(err => console.log(err))
  }
  
  static destory(options){
    const db = getDb()
    let data

    data = db.collection("products")
      .deleteMany(options)

    return data
  }
}


module.exports = Product;
