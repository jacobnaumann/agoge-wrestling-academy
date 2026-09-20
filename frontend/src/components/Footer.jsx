import { useContent } from '../data/ContentContext'
import './Footer.css'

function FooterLink({ link }) {
  const external = /^https?:\/\//i.test(link.href)
  return (
    <a
      href={link.href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {link.label}
    </a>
  )
}

export default function Footer() {
  const { site, footer } = useContent()
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
          {footer.groups.map((group, groupIndex) => (
            <div className="footer-nav-group" key={`${group.title}-${groupIndex}`}>
              <div className="footer-nav-title">{group.title}</div>
              <ul className="footer-nav-links">
                {group.links
                  .filter((link) => link.label && link.href)
                  .map((link, linkIndex) => (
                    <li key={`${link.label}-${linkIndex}`}>
                      <FooterLink link={link} />
                    </li>
                  ))}
              </ul>
            </div>
          ))}
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
