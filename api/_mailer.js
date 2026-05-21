const nodemailer = require('nodemailer')

const createTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function sendNotificationEmail(contact) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('📧 Email skipped — SMTP credentials not configured')
    return
  }

  const transporter = createTransporter()

  try {
    await transporter.sendMail({
      from: `"Portfolio Bot" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
      subject: `📬 Portfolio Contact: ${contact.subject || 'New Message'} — from ${contact.name}`,
      html: `<p>New message from ${contact.name} &lt;${contact.email}&gt;</p><pre>${contact.message}</pre>`,
    })

    await transporter.sendMail({
      from: `"${process.env.NOTIFY_NAME || 'Portfolio Owner'}" <${process.env.SMTP_USER}>`,
      to: contact.email,
      subject: `Thanks for reaching out, ${contact.name.split(' ')[0]}!`,
      html: `<p>Thanks for your message — I'll get back to you soon.</p>`,
    })
  } catch (err) {
    console.error('📧 Email notification failed:', err && err.message)
  }
}

module.exports = { sendNotificationEmail }
