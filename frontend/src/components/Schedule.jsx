import { schedule, scheduleTiers } from '../data/siteContent'
import './Schedule.css'

export default function Schedule() {
  return (
    <section className="schedule texture-overlay" id="schedule">
      <div className="schedule-inner">
        <div className="schedule-header">
          <div>
            <div className="section-label">Weekly Class Schedule</div>
            <h2 className="section-title">When We Train</h2>
          </div>
          <a href="#contact" className="btn-outline">Enroll Today →</a>
        </div>

        <div className="schedule-grid">
          {schedule.days.map((d) => (
            <div className={`schedule-day${d.rest ? ' rest' : ''}`} key={d.day}>
              <div className="schedule-day-name">{d.day}</div>
              {d.rest ? (
                <div className="schedule-rest">Rest Day</div>
              ) : (
                d.classes.map((c, i) => (
                  <div
                    className="schedule-class"
                    style={{ borderLeftColor: scheduleTiers[c.tier].color }}
                    key={i}
                  >
                    <div className="schedule-class-time">{c.time}</div>
                    <div className="schedule-class-name">{c.name}</div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>

        <div className="schedule-legend">
          {schedule.legend.map((l) => (
            <div
              className="legend-card"
              style={{ borderTopColor: scheduleTiers[l.tier].color }}
              key={l.tier}
            >
              <div className="legend-name">{scheduleTiers[l.tier].name}</div>
              <div className="legend-meta">
                {l.meta.split('\n').map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </div>
              <span className="legend-drop">{l.drop}</span>
            </div>
          ))}
        </div>

        <p className="section-note">{schedule.note}</p>
      </div>
    </section>
  )
}
