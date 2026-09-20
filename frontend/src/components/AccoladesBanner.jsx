import { useContent } from '../data/ContentContext'
import './AccoladesBanner.css'

export default function AccoladesBanner() {
  const { accolades } = useContent()
  return (
    <div className="accolades-banner">
      <div className="accolades-inner">
        {accolades.map((a) => (
          <div className="accolade-item" key={a.label}>
            <div className="accolade-num">{a.num}</div>
            <div className="accolade-label">
              {a.label.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
