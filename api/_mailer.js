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

  // Rich notification email to portfolio owner
  await transporter.sendMail({
    from: `"Portfolio Bot" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
    subject: `📬 Portfolio Contact: ${contact.subject || 'New Message'} — from ${contact.name}`,
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f0f0f8; padding: 40px; border-radius: 16px; border: 1px solid rgba(0,212,255,0.2);">
        <div style="margin-bottom: 32px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.3); border-radius: 999px; font-size: 12px; color: #00d4ff; font-family: monospace; letter-spacing: 0.1em; text-transform: uppercase;">
            NEW PORTFOLIO CONTACT
          </div>
        </div>
        <h2 style="color: #f0f0f8; font-size: 24px; margin: 0 0 8px; font-weight: 700;">
          Message from <span style="color: #00d4ff;">${contact.name}</span> 🚀
        </h2>
        <p style="color: #555570; font-size: 13px; margin: 0 0 32px; font-family: monospace;">
          Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
        </p>
        
        <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.03); border-radius: 12px; overflow: hidden;">
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="padding: 16px 20px; color: #8888aa; font-size: 12px; font-family: monospace; letter-spacing: 0.08em; text-transform: uppercase; width: 100px; white-space: nowrap;">Name</td>
            <td style="padding: 16px 20px; color: #f0f0f8; font-weight: 600;">${contact.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="padding: 16px 20px; color: #8888aa; font-size: 12px; font-family: monospace; letter-spacing: 0.08em; text-transform: uppercase;">Email</td>
            <td style="padding: 16px 20px;"><a href="mailto:${contact.email}" style="color: #00d4ff; text-decoration: none;">${contact.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
            <td style="padding: 16px 20px; color: #8888aa; font-size: 12px; font-family: monospace; letter-spacing: 0.08em; text-transform: uppercase;">Subject</td>
            <td style="padding: 16px 20px; color: #f0f0f8;">${contact.subject || 'No Subject'}</td>
          </tr>
          <tr>
            <td style="padding: 16px 20px; color: #8888aa; font-size: 12px; font-family: monospace; letter-spacing: 0.08em; text-transform: uppercase; vertical-align: top;">Message</td>
            <td style="padding: 16px 20px; color: #f0f0f8; line-height: 1.75;">${contact.message.replace(/\n/g, '<br />')}</td>
          </tr>
        </table>

        <div style="margin-top: 32px; padding: 16px 20px; background: rgba(0,212,255,0.06); border-left: 3px solid #00d4ff; border-radius: 0 8px 8px 0;">
          <p style="margin: 0; color: #8888aa; font-size: 13px;">
            Reply directly to <a href="mailto:${contact.email}" style="color: #00d4ff;">${contact.email}</a> to respond.
          </p>
        </div>
      </div>
    `,
  })

  // Rich auto-reply to sender
  await transporter.sendMail({
    from: `"Sai Santhosh Borra" <${process.env.SMTP_USER}>`,
    to: contact.email,
    subject: `Thanks for reaching out, ${contact.name.split(' ')[0]}! 👋`,
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f0f0f8; padding: 40px; border-radius: 16px; border: 1px solid rgba(0,212,255,0.2);">
        <h2 style="color: #00d4ff; font-size: 28px; margin: 0 0 24px;">
          Hey ${contact.name.split(' ')[0]}! 👋
        </h2>
        <p style="color: #8888aa; line-height: 1.8; margin: 0 0 20px; font-size: 15px;">
          Thanks for getting in touch! I've received your message and will get back to you as soon as possible — usually within 24 hours.
        </p>

        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin: 24px 0;">
          <p style="color: #555570; font-size: 12px; font-family: monospace; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 12px;">Your message</p>
          <p style="color: #8888aa; font-style: italic; line-height: 1.7; margin: 0; font-size: 14px; border-left: 2px solid rgba(0,212,255,0.3); padding-left: 16px;">
            "${contact.message.slice(0, 300)}${contact.message.length > 300 ? '...' : ''}"
          </p>
        </div>

        <p style="color: #8888aa; line-height: 1.8; margin: 0 0 32px; font-size: 15px;">
          In the meantime, feel free to check out my work on
          <a href="https://github.com/saisanthu07" style="color: #00d4ff; text-decoration: none;">GitHub</a>
          or connect on
          <a href="https://linkedin.com/in/saisanthoshborra/" style="color: #00d4ff; text-decoration: none;">LinkedIn</a>.
        </p>

        <div style="border-top: 1px solid rgba(255,255,255,0.07); padding-top: 24px; margin-top: 8px;">
          <p style="color: #555570; font-size: 14px; margin: 0;">
            Best,<br />
            <strong style="color: #f0f0f8;">Sai Santhosh Borra</strong><br />
            <span style="color: #00d4ff; font-family: monospace; font-size: 12px;">Full Stack Developer · AWS</span>
          </p>
        </div>
      </div>
    `,
  })
}

module.exports = { sendNotificationEmail }
