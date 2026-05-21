const mongoose = require('mongoose')

// Don't assume a local MongoDB in production — require explicit MONGODB_URI for cloud deployments.
const MONGODB_URI = process.env.MONGODB_URI

if (!global._mongo) {
  global._mongo = { conn: null, promise: null }
}

async function connect() {
  // If no URI provided, skip connecting (useful for static deployments or when DB isn't configured).
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI not set — skipping MongoDB connection')
    return mongoose
  }

  if (global._mongo.conn) return global._mongo.conn
  if (!global._mongo.promise) {
    // Mongoose v6+ no longer needs useNewUrlParser/useUnifiedTopology options
    global._mongo.promise = mongoose.connect(MONGODB_URI).then(() => mongoose)
  }
  try {
    global._mongo.conn = await global._mongo.promise
    return global._mongo.conn
  } catch (err) {
    console.error('MongoDB connection error:', err && err.message ? err.message : err)
    // rethrow to let callers decide; callers should handle errors gracefully
    throw err
  }
}

module.exports = { connect, mongoose }
