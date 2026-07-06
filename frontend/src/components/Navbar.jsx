import { useState } from 'react'
import { site } from '../data/siteContent'
import './Navbar.css'

const links = [
  { href: '#programs', label: 'Programs' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#competitions', label: 'Competitions' },
  { href: '#staff', label: 'Staff' },
  { href: '#personal-training', label: 'Personal Training' },
  { href: '#camps', label: 'Camps' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <a href="#home" className="nav-brand" aria-label={`${site.name} home`}>
        <span className="nav-brand-mark">Λ</span>
        <span className="nav-brand-text">
          {site.shortName}
          <span className="nav-brand-sub">{site.tagline}</span>
        </span>
      </a>

      <button
        className="nav-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#programs" className="nav-cta" onClick={() => setOpen(false)}>
            Enroll Now
          </a>
        </li>
      </ul>
    </nav>
  )
}
