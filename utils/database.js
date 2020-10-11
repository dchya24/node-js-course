const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient
const uri = 'mongodb+srv://mitang:LSPFVnTQS0RIC05C@learning.9sjii.gcp.mongodb.net/test'

let _db;

const mongoConnet = (cb) => {
  MongoClient.connect(
    uri,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10
    },
    (err, client) => {
      if(err) {
        throw err
      }
      _db = client.db()
      cb()
    }
  )
}

const getDb = () => {
  if(_db) {
    return _db
  }
  throw "No Database found!"
}

exports.mongoConnet = mongoConnet
exports.getDb = getDb