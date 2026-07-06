import { programs } from '../data/siteContent'
import './Programs.css'

function ProgramCard({ program }) {
  const external = program.external
  return (
    <a
      className="program-card"
      href={program.link}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <div className="program-age">{program.age}</div>
      <div className="program-name">{program.name}</div>
      <div className="program-desc">{program.desc}</div>
      <span className="program-arrow">{program.arrowText || 'Register Now'} →</span>
    </a>
  )
}

export default function Programs() {
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
