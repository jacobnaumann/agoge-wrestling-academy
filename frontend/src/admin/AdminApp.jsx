import { useEffect, useState } from 'react'
import { login, fetchContent, saveContent, getToken, setToken, clearToken } from './api.js'
import {
  SiteInfoEditor,
  HeroEditor,
  AccoladesEditor,
  AboutEditor,
} from './sections/GeneralSections.jsx'
import { ProgramsEditor, ScheduleEditor } from './sections/ProgramSections.jsx'
import {
  CompetitionsEditor,
  StaffEditor,
  PersonalTrainingEditor,
  CampsEditor,
} from './sections/PeopleSections.jsx'
import { SeedReviewsEditor, FormOptionsEditor } from './sections/MiscSections.jsx'
import './AdminApp.css'

const SECTIONS = [
  { id: 'site', label: 'Site Info' },
  { id: 'hero', label: 'Hero' },
  { id: 'accolades', label: 'Accolades' },
  { id: 'about', label: 'About' },
  { id: 'programs', label: 'Programs' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'competitions', label: 'Competitions' },
  { id: 'staff', label: 'Staff' },
  { id: 'personalTraining', label: 'Personal Training' },
  { id: 'camps', label: 'Camps' },
  { id: 'seedReviews', label: 'Reviews' },
  { id: 'formOptions', label: 'Form Options' },
]

function LoginScreen({ onLoggedIn }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!password || busy) return
    setBusy(true)
    setError('')
    try {
      const token = await login(password)
      setToken(token)
      onLoggedIn()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="adm-login-wrap">
      <form className="adm-login" onSubmit={submit}>
        <div className="adm-login-mark">Λ</div>
        <h1>Admin Login</h1>
        <p className="adm-login-sub">Agoge Wrestling Academy — site editor</p>
        <label className="adm-field">
          <span className="adm-field-label">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            autoFocus
          />
        </label>
        <button className="adm-save-btn" type="submit" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign In'}
        </button>
        {error && <div className="adm-error">{error}</div>}
      </form>
    </div>
  )
}

export default function AdminApp() {
  const [authed, setAuthed] = useState(() => !!getToken())
  const [content, setContent] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [active, setActive] = useState('site')
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null) // { kind: 'ok' | 'err', text }

  useEffect(() => {
    if (!authed) return
    fetchContent()
      .then(setContent)
      .catch((err) => setLoadError(err.message))
  }, [authed])

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return
    const warn = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const update = (key, value) => {
    setContent((c) => ({ ...c, [key]: value }))
    setDirty(true)
  }

  const showToast = (kind, text) => {
    setToast({ kind, text })
    setTimeout(() => setToast(null), 4000)
  }

  const expireSession = () => {
    clearToken()
    setAuthed(false)
  }

  const save = async () => {
    if (saving) return
    setSaving(true)
    try {
      await saveContent(content)
      setDirty(false)
      showToast('ok', 'Changes saved. They are live on the site now.')
    } catch (err) {
      if (err.unauthorized) {
        expireSession()
        return
      }
      showToast('err', err.message)
    } finally {
      setSaving(false)
    }
  }

  const logout = () => {
    if (dirty && !window.confirm('You have unsaved changes. Log out anyway?')) return
    clearToken()
    setAuthed(false)
    setContent(null)
    setDirty(false)
  }

  if (!authed) return <LoginScreen onLoggedIn={() => setAuthed(true)} />

  if (loadError) {
    return (
      <div className="adm-login-wrap">
        <div className="adm-login">
          <h1>Something went wrong</h1>
          <div className="adm-error">{loadError}</div>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="adm-login-wrap">
        <div className="adm-loading">Loading site content…</div>
      </div>
    )
  }

  const renderSection = () => {
    switch (active) {
      case 'site':
        return <SiteInfoEditor data={content.site} onChange={(v) => update('site', v)} />
      case 'hero':
        return <HeroEditor data={content.hero} site={content.site} onChange={(v) => update('hero', v)} />
      case 'accolades':
        return <AccoladesEditor data={content.accolades} onChange={(v) => update('accolades', v)} />
      case 'about':
        return <AboutEditor data={content.about} onChange={(v) => update('about', v)} />
      case 'programs':
        return <ProgramsEditor data={content.programs} onChange={(v) => update('programs', v)} />
      case 'schedule':
        return (
          <ScheduleEditor
            data={content.schedule}
            onChange={(v) => update('schedule', v)}
            tiers={content.scheduleTiers}
            onTiersChange={(v) => update('scheduleTiers', v)}
          />
        )
      case 'competitions':
        return <CompetitionsEditor data={content.competitions} onChange={(v) => update('competitions', v)} />
      case 'staff':
        return (
          <StaffEditor
            data={content.staff}
            onChange={(v) => update('staff', v)}
            onUnauthorized={expireSession}
          />
        )
      case 'personalTraining':
        return (
          <PersonalTrainingEditor
            data={content.personalTraining}
            onChange={(v) => update('personalTraining', v)}
          />
        )
      case 'camps':
        return <CampsEditor data={content.camps} onChange={(v) => update('camps', v)} />
      case 'seedReviews':
        return <SeedReviewsEditor data={content.seedReviews} onChange={(v) => update('seedReviews', v)} />
      case 'formOptions':
        return (
          <FormOptionsEditor
            programOptions={content.programOptions}
            reviewProgramOptions={content.reviewProgramOptions}
            onChange={({ programOptions, reviewProgramOptions }) => {
              setContent((c) => ({ ...c, programOptions, reviewProgramOptions }))
              setDirty(true)
            }}
          />
        )
      default:
        return null
    }
  }

  const activeLabel = SECTIONS.find((s) => s.id === active)?.label

  return (
    <div className="adm-app">
      <header className="adm-topbar">
        <div className="adm-topbar-brand">
          <span className="adm-topbar-mark">Λ</span>
          <span>Agoge Site Editor</span>
        </div>
        <div className="adm-topbar-actions">
          {dirty && <span className="adm-unsaved">Unsaved changes</span>}
          <button className="adm-save-btn" onClick={save} disabled={saving || !dirty}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <a className="adm-link-btn" href="/" target="_blank" rel="noopener noreferrer">
            View Site
          </a>
          <button className="adm-link-btn" onClick={logout}>
            Log Out
          </button>
        </div>
      </header>

      <div className="adm-body">
        <nav className="adm-sidebar">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`adm-nav-item${active === s.id ? ' active' : ''}`}
              onClick={() => setActive(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <main className="adm-panel">
          <h2 className="adm-panel-title">{activeLabel}</h2>
          {renderSection()}
        </main>
      </div>

      {toast && <div className={`adm-toast ${toast.kind}`}>{toast.text}</div>}
    </div>
  )
}
