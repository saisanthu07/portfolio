const crypto = require('crypto')

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://saisanthoshborra.vercel.app',
  'https://portfolio-saisanthu07s-projects.vercel.app'
]

function isValidOrigin(origin) {
  if (!origin) return true // Allow requests with no origin
  if (ALLOWED_ORIGINS.includes(origin)) return true
  if (/^https:\/\/portfolio-[a-zA-Z0-9-]+\.vercel\.app$/.test(origin)) return true
  return false
}

function getCorsOrigin(req, fallback = 'https://saisanthoshborra.vercel.app') {
  const origin = req.headers.origin
  if (isValidOrigin(origin) && origin) {
    return origin
  }
  return fallback
}

function setSecurityHeaders(res, origin) {
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'; sandbox; base-uri 'none';")
}

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

function timingSafeCompare(input, secret) {
  if (!secret || secret.length < 8) return false
  if (typeof input !== 'string') return false
  
  const inputHash = crypto.createHash('sha256').update(input).digest()
  const secretHash = crypto.createHash('sha256').update(secret).digest()
  
  return crypto.timingSafeEqual(inputHash, secretHash)
}

function validateAdminKey(req, envKey) {
  if (!envKey || envKey.length < 8) {
    console.error('❌ Configuration Guard: ADMIN_KEY environment variable is unset or weaker than 8 characters.')
    return { valid: false, error: 'Authentication engine misconfigured.', status: 500 }
  }
  const adminKey = req.headers['x-admin-key']
  if (!adminKey || !timingSafeCompare(adminKey, envKey)) {
    return { valid: false, error: 'Unauthorized', status: 401 }
  }
  return { valid: true }
}

module.exports = {
  ALLOWED_ORIGINS,
  isValidOrigin,
  getCorsOrigin,
  setSecurityHeaders,
  sanitizeInput,
  timingSafeCompare,
  validateAdminKey
}
