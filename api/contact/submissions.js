const { connect } = require('../_db')
const Contact = require('../models/contact')
const security = require('../../shared/security')

// Simple in-memory rate limiter for serverless
const rateLimitMap = new Map()
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 100

function checkRateLimit(ip) {
  const now = Date.now()
  const key = ip || 'unknown'
  const record = rateLimitMap.get(key)

  if (!record || now - record.windowStart > WINDOW_MS) {
    rateLimitMap.set(key, { count: 1, windowStart: now })
    return true
  }

  if (record.count >= MAX_REQUESTS) return false

  record.count++
  return true
}

function setSecurityHeaders(req, res) {
  const origin = security.getCorsOrigin(req)
  security.setSecurityHeaders(res, origin)
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key')
}

module.exports = async (req, res) => {
  setSecurityHeaders(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limiting
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.connection?.remoteAddress || 'unknown'
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again after 15 minutes.' })
  }

  // Failsafe configuration guard and admin key check
  const validation = security.validateAdminKey(req, process.env.ADMIN_KEY)
  if (!validation.valid) {
    return res.status(validation.status).json({ error: validation.error })
  }

  try {
    await connect()
  } catch (err) {
    console.error('Submissions DB connection failed:', err.message)
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
    console.error('Submissions fetch error:', err.message)
    return res.status(500).json({ error: 'Server error' })
  }
}
