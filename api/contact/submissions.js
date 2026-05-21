const { connect } = require('../../_db')
const Contact = require('../../models/contact')

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const adminKey = req.headers['x-admin-key']
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  await connect()

  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100)
    res.json({ count: contacts.length, contacts })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
