const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'

if (!global._mongo) {
  global._mongo = { conn: null, promise: null }
}

async function connect() {
  if (global._mongo.conn) return global._mongo.conn
  if (!global._mongo.promise) {
    global._mongo.promise = mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => mongoose)
  }
  global._mongo.conn = await global._mongo.promise
  return global._mongo.conn
}

module.exports = { connect, mongoose }
