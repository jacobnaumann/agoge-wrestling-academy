import { useContent } from '../data/ContentContext'
import { getProgramOverlayStyle } from '../utils/programCard'
import './Programs.css'

function ProgramCard({ program }) {
  const external = program.external
  return (
    <a
      className={`program-card${program.image ? ' has-image' : ''}`}
      href={program.link}
      style={getProgramOverlayStyle(program.imageVisibility)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {program.image && (
        <img
          className="program-card-image"
          src={program.image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={(event) => event.currentTarget.remove()}
        />
      )}
      <span className="program-card-overlay" aria-hidden="true" />
      <div className="program-card-content">
        <div className="program-age">{program.age}</div>
        <div className="program-name">{program.name}</div>
        <div className="program-desc">{program.desc}</div>
        <span className="program-arrow">{program.arrowText || 'Register Now'} →</span>
      </div>
    </a>
  )
}

export default function Programs() {
  const { programs } = useContent()
  return (
    <section className="programs texture-overlay" id="programs">
      <div className="programs-header">
        <div>
          <div className="section-label">Training Programs</div>
          <h2 className="section-title">Find Your Level</h2>
        </div>
        <a href="#contact" className="btn-outline">Enroll Today →</a>
      </div>
      <div className="programs-grid">
        {programs.main.map((p) => (
          <ProgramCard key={p.name} program={p} />
        ))}
      </div>
      <div className="programs-row2">
        {programs.secondary.map((p) => (
          <ProgramCard key={p.name} program={p} />
        ))}
      </div>
    </section>
  )
}
