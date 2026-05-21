const { connect, mongoose } = require('../_db')
const Contact = require('../models/contact')

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key')
}

module.exports = async (req, res) => {
  setCorsHeaders(res)

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const adminKey = req.headers['x-admin-key']
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    await connect()
  } catch (err) {
    return res.status(503).json({ error: 'Database unavailable' })
  }

  try {
    const page = parseInt(req.query.page) || 1
    const limit = Math.min(parseInt(req.query.limit) || 50, 100)
    const skip = (page - 1) * limit

    const [contacts, total] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Contact.countDocuments(),
    ])

    return res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      count: contacts.length,
      contacts,
    })
  } catch (err) {
    console.error('Submissions fetch error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
