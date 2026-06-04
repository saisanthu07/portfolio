const { connect } = require('./_db')
const Contact = require('./models/contact')
const { sendNotificationEmail } = require('./_mailer')

// Simple in-memory rate limiter for serverless
const rateLimitMap = new Map()
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 5

/**
 * Simple in-memory rate limiter for serverless environment.
 * Restricts client IP to a maximum of 5 requests within a 15-minute window.
 *
 * @param {string} ip - The client IP address.
 * @returns {boolean} True if the request is within the rate limit, false otherwise.
 */
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

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://saisanthoshborra.vercel.app',
  'https://portfolio-saisanthu07s-projects.vercel.app'
]

/**
 * Resolves the correct CORS origin response header value based on the request's origin
 * header and a preconfigured list of allowed origins.
 *
 * @param {import('http').IncomingMessage} req - The HTTP request object.
 * @returns {string} The allowed origin to return in the response headers.
 */
function getCorsOrigin(req) {
  const origin = req.headers.origin
  if (!origin) return 'https://saisanthoshborra.vercel.app'
  if (ALLOWED_ORIGINS.includes(origin)) return origin
  if (/^https:\/\/portfolio-[a-zA-Z0-9-]+\.vercel\.app$/.test(origin)) return origin
  return 'https://saisanthoshborra.vercel.app'
}

/**
 * Configures the necessary security headers (like HSTS, CSP, CORS headers)
 * on the serverless HTTP response object.
 *
 * @param {import('http').IncomingMessage} req - The HTTP request object.
 * @param {import('http').ServerResponse} res - The HTTP response object.
 * @returns {void}
 */
function setSecurityHeaders(req, res) {
  const origin = getCorsOrigin(req)
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // Security Headers (Helmet Equivalent)
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'; sandbox; base-uri 'none';")
}

/**
 * Validates the contact form request body to ensure all fields are correctly formatted
 * and satisfy schema requirements.
 *
 * @param {object} body - The request body object.
 * @param {string} body.name - The name of the sender.
 * @param {string} body.email - The email address of the sender.
 * @param {string} body.message - The contact message content.
 * @returns {string|null} An error message string if validation fails, or null if validation passes.
 */
function validateBody(body) {
  if (!body) return 'Invalid request body'
  const { name, email, message } = body
  if (!name || typeof name !== 'string' || name.trim().length === 0) return 'Name is required'
  if (name.trim().length > 100) return 'Name must be under 100 characters'
  if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) return 'Valid email is required'
  if (!message || typeof message !== 'string' || message.trim().length < 10) return 'Message must be at least 10 characters'
  if (message.trim().length > 2000) return 'Message must be under 2000 characters'
  return null
}

/**
 * Sanitizes input string to shield against cross-site scripting (XSS)
 * and stored HTML/JS injection attacks by escaping critical characters.
 *
 * @param {string} str - The raw input string.
 * @param {number} [maxLength=2000] - The maximum length of string allowed.
 * @returns {string} The sanitized and truncated string.
 */
function sanitizeInput(str, maxLength = 2000) {
  if (typeof str !== 'string') return ''
  return str.trim()
    .slice(0, maxLength)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Serverless handler for the contact form API submission endpoint.
 * Validates the request body, checks rate limits, connects to DB,
 * creates a contact submission entry, and triggers email notifications.
 *
 * @async
 * @param {import('http').IncomingMessage} req - The HTTP request object.
 * @param {import('http').ServerResponse} res - The HTTP response object.
 * @returns {Promise<any>} Resolves when request processing completes.
 */
module.exports = async (req, res) => {
  setSecurityHeaders(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limiting
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.connection?.remoteAddress || 'unknown'
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again after 15 minutes.' })
  }

  const errMsg = validateBody(req.body)
  if (errMsg) return res.status(400).json({ error: errMsg })

  try {
    await connect()
  } catch (err) {
    console.error('DB connection error:', err.message)
    return res.status(503).json({ error: 'Service temporarily unavailable. Please try again later.' })
  }

  const { name, email, subject, message } = req.body

  try {
    const contact = await Contact.create({
      name: sanitizeInput(name, 100),
      email: email.toLowerCase().trim(),
      subject: subject ? sanitizeInput(subject, 200) : 'No Subject',
      message: sanitizeInput(message, 2000),
      ip: clientIp,
    })

    // Await email sending on serverless so Vercel does not freeze/abort the function mid-send
    try {
      await sendNotificationEmail(contact)
    } catch (err) {
      console.error('Email notification failed:', err.message)
    }

    console.log(`📩 New contact from ${contact.name} <${contact.email}>`)

    return res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon.",
      id: contact._id,
    })
  } catch (err) {
    console.error('Contact save error:', err.message)
    return res.status(500).json({ error: 'Server error. Please try again later.' })
  }
}
