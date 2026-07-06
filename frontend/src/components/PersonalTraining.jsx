import { personalTraining } from '../data/siteContent'
import './PersonalTraining.css'

export default function PersonalTraining() {
  return (
    <section className="pt texture-overlay" id="personal-training">
      <div className="pt-inner">
        <div className="pt-header">
          <div>
            <div className="section-label">One-on-One Coaching</div>
            <h2 className="section-title">Personal Training</h2>
          </div>
          <a href="#contact" className="btn-outline">Schedule a Session →</a>
        </div>

        <p className="pt-intro">{personalTraining.intro}</p>

        <div className="pt-grid">
          {personalTraining.cards.map((c) => (
            <div className={`pt-card${c.featured ? ' featured' : ''}`} key={c.name}>
              <div className="pt-card-tag">{c.tag}</div>
              <div className="pt-card-price">
                <span className="pt-card-amount">{c.amount}</span>
                <span className="pt-card-unit">{c.unit}</span>
              </div>
              <div className="pt-card-name">{c.name}</div>
              <div className="pt-card-desc">{c.desc}</div>
            </div>
          ))}
        </div>

        <div className="pt-notes">
          {personalTraining.notes.map((n) => (
            <div className="pt-note" key={n.label}>
              <div className="pt-note-label">{n.label}</div>
              <div className="pt-note-text">
                {n.text}
                <a href={n.linkHref}>{n.linkText}</a>
                {n.textAfter}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
