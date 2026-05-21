const { connect } = require('./_db')
const Contact = require('./models/contact')
const { sendNotificationEmail } = require('./_mailer')

function validateBody(body) {
  if (!body) return 'Invalid request body'
  const { name, email, message } = body
  if (!name || typeof name !== 'string' || name.trim().length === 0) return 'Name is required'
  if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) return 'Valid email is required'
  if (!message || typeof message !== 'string' || message.trim().length < 10) return 'Message must be at least 10 characters'
  return null
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const errMsg = validateBody(req.body)
  if (errMsg) return res.status(400).json({ error: errMsg })

  await connect()

  const { name, email, subject, message } = req.body

  try {
    const contact = await Contact.create({ name, email, subject: subject || 'No Subject', message, ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress })

    // Fire-and-forget email
    sendNotificationEmail(contact).catch(() => {})

    return res.status(201).json({ success: true, message: "Message received! I'll get back to you soon.", id: contact._id })
  } catch (err) {
    console.error('Contact save error:', err)
    return res.status(500).json({ error: 'Server error. Please try again later.' })
  }
}
