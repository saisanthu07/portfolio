import { useState } from 'react'
import { useFadeIn } from '../hooks/useFadeIn'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'

const initialForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [ref, visible] = useFadeIn()
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('')

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage('Message sent! I\'ll get back to you soon 🚀')
        setForm(initialForm)
      } else {
        throw new Error(data.error || 'Failed to send')
      }
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" ref={ref}>
      <div className="container">
        <p className="section-label">Get In Touch</p>
        <h2 className="section-title">Let's talk</h2>

        <div className={`contact-wrapper fade-in${visible ? ' visible' : ''}`}>
          {/* Contact Info */}
          <div className="contact-info">
            <h3>Available for opportunities</h3>
            <p>
              I'm actively looking for full-stack or backend developer roles. Whether
              you have a project to discuss, a position to fill, or just want to say
              hello — my inbox is always open.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-item-icon">📧</div>
                <div className="contact-item-text">
                  <span className="contact-item-label">Email</span>
                  <a className="contact-item-value" href="mailto:saisanthoshborra@gmail.com">
                    saisanthoshborra@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div className="contact-item-text">
                  <span className="contact-item-label">Location</span>
                  <span className="contact-item-value">Amalapuram, ANdhra Pradesh · Remote, On-site (Open-to-Work)</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-item-icon">💼</div>
                <div className="contact-item-text">
                  <span className="contact-item-label">LinkedIn</span>
                  <a
                    className="contact-item-value"
                    href="https://linkedin.com/in/saisanthoshborra/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    /in/saisanthoshborra
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="form-input"
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Tell me about your project, opportunity, or just say hi..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="form-submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <span className="spinner" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </>
              )}
            </button>

            {message && (
              <div className={`form-message ${status === 'success' ? 'success' : 'error'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
