import { competitions } from '../data/siteContent'
import './Competitions.css'

export default function Competitions() {
  return (
    <section className="competitions texture-overlay" id="competitions">
      <div className="competitions-inner">
        <div className="competitions-header">
          <div>
            <div className="section-label">Competition Season</div>
            <h2 className="section-title">Upcoming Competitions</h2>
          </div>
          <a href="#contact" className="btn-outline">Registration Info →</a>
        </div>

        <div className="competitions-list">
          {competitions.events.map((e) => (
            <article className="comp-card" key={e.name}>
              <div className="comp-date">
                <span className="comp-date-month">{e.month}</span>
                <span className="comp-date-day">{e.day}</span>
              </div>
              <div className="comp-info">
                <div className="comp-name">{e.name}</div>
                <div className="comp-meta">
                  <span className="comp-meta-item">
                    <span className="comp-meta-label">Venue</span> {e.venue}
                  </span>
                  <span className="comp-meta-item">
                    <span className="comp-meta-label">Compete</span> {e.compete}
                  </span>
                </div>
              </div>
              <span className="comp-badge">{e.badge}</span>
            </article>
          ))}
        </div>

        <p className="section-note">{competitions.note}</p>
      </div>
    </section>
  )
}
