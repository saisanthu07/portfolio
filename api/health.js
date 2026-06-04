const { connect, mongoose } = require('./_db')

/**
 * Serverless API handler that checks the health of the application,
 * specifically verifying the active connection state of the MongoDB database.
 *
 * @async
 * @param {import('http').IncomingMessage} req - The HTTP request object.
 * @param {import('http').ServerResponse} res - The HTTP response object.
 * @returns {Promise<void>}
 */
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
