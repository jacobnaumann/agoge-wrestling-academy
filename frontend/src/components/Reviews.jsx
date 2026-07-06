import { useEffect, useState } from 'react'
import { seedReviews, reviewProgramOptions, site } from '../data/siteContent'
import './Reviews.css'

const STORAGE_KEY = 'agoge-reviews'

// Reviews are stored in localStorage for now. When the backend is wired up,
// swap these for API calls to /api/reviews.
function loadStoredReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function StarSelector({ value, onChange }) {
  const [hover, setHover] = useState(0)
  const active = hover || value
  return (
    <div className="star-selector">
      {[1, 2, 3, 4, 5].map((v) => (
        <button
          key={v}
          type="button"
          className={`star-btn${v <= active ? ' active' : ''}`}
          onMouseOver={() => setHover(v)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(v)}
          aria-label={`${v} star${v > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [stored, setStored] = useState([])
  const [name, setName] = useState('')
  const [program, setProgram] = useState('')
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setStored(loadStoredReviews())
  }, [])

  const reviews = [...seedReviews, ...stored]

  const submit = () => {
    if (!name.trim() || !text.trim() || rating === 0) {
      setError('Please fill in your name, rating, and review.')
      return
    }
    setError('')
    const newReview = {
      name: name.trim(),
      program: program || 'General',
      rating,
      text: text.trim(),
    }
    const updated = [...stored, newReview]
    setStored(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // Storage unavailable (private mode); review still shows for the session.
    }
    setName('')
    setProgram('')
    setRating(0)
    setText('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <section className="reviews texture-overlay" id="reviews">
      <div className="reviews-inner">
        <div className="reviews-header">
          <div>
            <div className="section-label">Community Reviews</div>
            <h2 className="section-title">What Families Are Saying</h2>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div className="review-card" key={i}>
              <div className="review-stars">
                {'★'.repeat(r.rating)}
                {'☆'.repeat(5 - r.rating)}
              </div>
              <div className="review-text">"{r.text}"</div>
              <div className="review-author">
                {r.name} <span>· {r.program}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="review-form-container">
          <div className="review-form-title">Leave a Review</div>
          <div className="review-form-sub">Share your experience with {site.name}</div>

          <div className="review-form-grid">
            <div className="form-group">
              <label htmlFor="review-name">Your Name</label>
              <input
                type="text"
                id="review-name"
                placeholder="Parent or Athlete Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="review-program">Program</label>
              <select
                id="review-program"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              >
                <option value="">Select a program…</option>
                {reviewProgramOptions.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Rating</label>
              <StarSelector value={rating} onChange={setRating} />
            </div>
          </div>
          <div className="form-group review-form-textarea">
            <label htmlFor="review-text">Your Review</label>
            <textarea
              id="review-text"
              placeholder="Tell us about your experience — how has Agoge impacted your athlete?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button className="btn-primary" type="button" onClick={submit}>
            Submit Review
          </button>
          {error && <div className="review-error">{error}</div>}
          {success && (
            <div className="review-success">✓ Thank you! Your review has been submitted.</div>
          )}
        </div>
      </div>
    </section>
  )
}
