import { site } from '../data/siteContent'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo-row">
            <span className="footer-logo-mark">Λ</span>
            <div className="footer-brand-name">{site.shortName}</div>
          </div>
          <div className="footer-tagline">
            {site.tagline} · {site.address.line1} · Est. {site.established}
          </div>
        </div>
        <div className="footer-nav">
          <div className="footer-nav-group">
            <div className="footer-nav-title">Programs</div>
            <ul className="footer-nav-links">
              <li><a href="#programs">Spartans Youth</a></li>
              <li><a href="#programs">Hoplites</a></li>
              <li><a href="#programs">Elite</a></li>
              <li><a href="#programs">Homeschool</a></li>
              <li><a href="#personal-training">Personal Training</a></li>
            </ul>
          </div>
          <div className="footer-nav-group">
            <div className="footer-nav-title">Academy</div>
            <ul className="footer-nav-links">
              <li><a href="#staff">Staff</a></li>
              <li><a href="#schedule">Schedule</a></li>
              <li><a href="#competitions">Competitions</a></li>
              <li><a href="#camps">Camps</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-social">
          <div className="footer-social-title">Follow Us</div>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-ig"
          >
            📷 {site.instagram.handle}
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
        <div className="footer-copy">
          {site.email} · {site.phone}
        </div>
      </div>
    </footer>
  )
}
