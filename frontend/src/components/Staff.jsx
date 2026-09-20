import { useContent } from '../data/ContentContext'
import { getCoachAccoladeGroups, getCoachOverlayStyle } from '../utils/coachCard'
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

function CoachAccoladeGroups({ coach }) {
  const groups = getCoachAccoladeGroups(coach)
  if (groups.length === 0) return null

  return (
    <div className="staff-accolade-groups">
      {groups.map((group, index) => (
        <div className="staff-accolade-group" key={`${group.label}-${index}`}>
          {group.label && <div className="accolades-section-label">{group.label}</div>}
          <AccoladeList items={group.items ?? []} />
        </div>
      ))}
    </div>
  )
}

function CoachBackground({ coach }) {
  return (
    <>
      <span className="staff-card-watermark" aria-hidden="true">Λ</span>
      {coach.image && (
        <img
          className="staff-card-image"
          src={coach.image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={(event) => event.currentTarget.remove()}
        />
      )}
    </>
  )
}

function CoachIdentity({ coach, showEmail = false }) {
  return (
    <div className="staff-identity">
      <div className="staff-role">{coach.role}</div>
      <div className="staff-name">{coach.name}</div>
      <div className="staff-contact">
        📞 <a href={`tel:${coach.phone.replace(/\D/g, '')}`}>{coach.phone}</a>
        {showEmail && (
          <>
            <span className="staff-contact-divider">·</span>
            ✉️ <a href={`mailto:${coach.email}`}>{coach.email}</a>
          </>
        )}
      </div>
    </div>
  )
}

export default function Staff() {
  const { staff } = useContent()
  const head = staff.headCoach
  return (
    <section className="staff texture-overlay" id="staff">
      <div className="staff-inner">
        <div className="staff-header">
          <div className="section-label">Coaching Staff</div>
          <h2 className="section-title">Meet the Coaches</h2>
        </div>
        <div className="staff-grid">
          <div className="staff-card head-coach" style={getCoachOverlayStyle(head.photoVisibility)}>
            <CoachBackground coach={head} />
            <div className="staff-card-content">
              <CoachIdentity coach={head} showEmail />
              <div className="staff-accolade-columns">
                {head.columns.map((column, index) => (
                  <div className="staff-accolade-column" key={index}>
                    {column.map((group) => (
                      <div key={group.label}>
                        <div className="accolades-section-label">{group.label}</div>
                        <AccoladeList items={group.items} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {staff.assistants.map((coach) => (
            <div
              className="staff-card"
              key={coach.name}
              style={getCoachOverlayStyle(coach.photoVisibility)}
            >
              <CoachBackground coach={coach} />
              <div className="staff-card-content">
                <CoachIdentity coach={coach} />
                <CoachAccoladeGroups coach={coach} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
