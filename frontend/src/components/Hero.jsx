import { hero, site } from '../data/siteContent'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-content">
        <div className="hero-eyebrow">{hero.eyebrow}</div>
        <h1>
          {hero.titleLine1}
          <span className="line2">{hero.titleLine2}</span>
        </h1>
        <p className="hero-sub">{hero.sub}</p>
        <div className="hero-actions">
          <a href="#programs" className="btn-primary">View Programs</a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
        </div>
      </div>
      <div className="ig-bar">
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="ig-btn">
          <span className="ig-icon">📷</span>
          {site.instagram.handle}
        </a>
      </div>
    </section>
  )
}
