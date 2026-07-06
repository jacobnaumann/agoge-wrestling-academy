import { camps } from '../data/siteContent'
import './Camps.css'

export default function Camps() {
  return (
    <section className="camps texture-overlay" id="camps">
      <div className="camps-inner">
        <div className="section-label">Camps &amp; Events</div>
        <h2 className="section-title">Upcoming Camps &amp; Clinics</h2>
        <div className="camps-grid">
          {camps.items.map((c) => (
            <a className="camp-card" href={c.link} key={c.name}>
              <div className="camp-date">{c.date}</div>
              <div className="camp-name">{c.name}</div>
              <div className="camp-desc">{c.desc}</div>
            </a>
          ))}
        </div>
        <p className="section-note">{camps.note}</p>
      </div>
    </section>
  )
}
