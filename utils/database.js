const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient
const dbUser = process.env.DB_USER
const dbHost = process.env.DB_HOST
const dbPass = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME

const uri = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}`

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