const { connect, mongoose } = require('./_db')

module.exports = async (req, res) => {
  await connect()
  res.json({ status: 'ok', mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected', timestamp: new Date().toISOString() })
}
