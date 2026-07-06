import { staff } from '../data/siteContent'
import './Staff.css'

function AccoladeList({ items }) {
  return (
    <ul className="staff-accolades">
      {items.map((a) => (
        <li key={a}>{a}</li>
      ))}
    </ul>
  )
}

export default function Staff() {
  const head = staff.headCoach
  return (
    <section className="staff texture-overlay" id="staff">
      <div className="staff-inner">
        <div className="staff-header">
          <div className="section-label">Coaching Staff</div>
          <h2 className="section-title">Meet the Coaches</h2>
        </div>
        <div className="staff-grid">
          <div className="staff-card head-coach">
            <div>
              <div className="staff-role">{head.role}</div>
              <div className="staff-name">{head.name}</div>
              <div className="staff-contact">
                📞 <a href={`tel:${head.phone.replace(/\D/g, '')}`}>{head.phone}</a>
                &nbsp;·&nbsp; ✉️ <a href={`mailto:${head.email}`}>{head.email}</a>
              </div>
              {head.columns[0].map((group) => (
                <div key={group.label}>
                  <div className="accolades-section-label">{group.label}</div>
                  <AccoladeList items={group.items} />
                </div>
              ))}
            </div>
            <div>
              {head.columns[1].map((group) => (
                <div key={group.label}>
                  <div className="accolades-section-label">{group.label}</div>
                  <AccoladeList items={group.items} />
                </div>
              ))}
            </div>
          </div>

          {staff.assistants.map((coach) => (
            <div className="staff-card" key={coach.name}>
              <div className="staff-role">{coach.role}</div>
              <div className="staff-name">{coach.name}</div>
              <div className="staff-contact">
                📞 <a href={`tel:${coach.phone.replace(/\D/g, '')}`}>{coach.phone}</a>
              </div>
              <AccoladeList items={coach.accolades} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
