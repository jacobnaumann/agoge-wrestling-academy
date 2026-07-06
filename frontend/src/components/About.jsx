import { about, site } from '../data/siteContent'
import './About.css'

export default function About() {
  return (
    <section className="about texture-overlay" id="about">
      <div className="about-inner">
        <div>
          <div className="section-label">About the Academy</div>
          <h2 className="section-title">
            {about.title[0]}
            <br />
            {about.title[1]}
          </h2>
          <div className="about-text">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="about-badge">
            <span className="about-badge-icon">🏛️</span>
            {about.badge}
          </div>
        </div>
        <div className="logo-display">
          <div className="logo-container">
            {/* Placeholder mark until the client provides the real logo */}
            <div className="logo-placeholder">
              <span className="logo-placeholder-mark">Λ</span>
              <span className="logo-placeholder-name">{site.shortName}</span>
              <span className="logo-placeholder-sub">{site.tagline}</span>
            </div>
          </div>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-follow-card"
          >
            <span className="ig-big-icon">📷</span>
            <div>
              <div className="ig-text-label">Follow us on Instagram</div>
              <div className="ig-handle">{site.instagram.handle}</div>
              <div className="ig-followers">Training clips, wins &amp; academy news</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
