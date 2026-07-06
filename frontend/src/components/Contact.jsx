import { useState } from 'react'
import { site, programOptions } from '../data/siteContent'
import './Contact.css'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [program, setProgram] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const send = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.')
      return
    }
    setError('')
    // TODO: POST to /api/contact once the backend is wired up.
    // For now, fall back to a pre-filled mailto link.
    const subject = encodeURIComponent(`Website Inquiry — ${program || 'General'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProgram: ${program || 'General'}\n\n${message}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setSuccess(true)
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <section className="contact texture-overlay" id="contact">
      <div className="contact-inner">
        <div>
          <div className="section-label">Get in Touch</div>
          <h2 className="section-title contact-title">Ready to Start Training?</h2>
          <div className="contact-item">
            <div className="contact-item-label">Location</div>
            <div className="contact-item-value">
              {site.address.line1}
              <br />
              {site.address.line2}
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-item-label">Phone / Text</div>
            <div className="contact-item-value">
              <a href={`tel:${site.phone.replace(/\D/g, '')}`}>{site.phone}</a>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-item-label">Email</div>
            <div className="contact-item-value">
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-item-label">Instagram</div>
            <div className="contact-item-value">
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                {site.instagram.handle}
              </a>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-item-label">Training Ages</div>
            <div className="contact-item-value">Ages 4–18 · Year-Round</div>
          </div>
        </div>
        <div className="contact-form">
          <div className="contact-form-title">Send a Message</div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="c-name">Your Name</label>
              <input
                type="text"
                id="c-name"
                placeholder="Parent or Athlete"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="c-email">Email</label>
              <input
                type="email"
                id="c-email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group contact-form-field">
            <label htmlFor="c-program">Program Interest</label>
            <select id="c-program" value={program} onChange={(e) => setProgram(e.target.value)}>
              <option value="">Select a program…</option>
              {programOptions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="form-group contact-form-field-last">
            <label htmlFor="c-message">Message</label>
            <textarea
              id="c-message"
              placeholder="Tell us about your athlete and any questions you have…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="btn-primary contact-send" type="button" onClick={send}>
            Send Message
          </button>
          {error && <div className="contact-error">{error}</div>}
          {success && (
            <div className="contact-success">✓ Message sent! We will be in touch soon.</div>
          )}
        </div>
      </div>
    </section>
  )
}
