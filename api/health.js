const { connect, mongoose } = require('./_db')

module.exports = async (req, res) => {
  try {
    await connect()
  } catch (err) {
    // Log error for visibility in Vercel logs and return a safe health response
    console.error('Health check: MongoDB connection failed:', err && err.message ? err.message : err)
    return res.status(200).json({ status: 'ok', mongo: 'error', timestamp: new Date().toISOString() })
  }

  const state = mongoose && mongoose.connection && mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  res.status(200).json({ status: 'ok', mongo: state, timestamp: new Date().toISOString() })
}
