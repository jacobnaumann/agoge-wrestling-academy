import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultContent, deriveContent } from './siteContent'

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [raw, setRaw] = useState(defaultContent)

  useEffect(() => {
    let cancelled = false
    fetch('/api/content')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.status))))
      .then((data) => {
        if (!cancelled) setRaw(data)
      })
      .catch(() => {
        // Backend unreachable (e.g. dev without server) — keep bundled defaults.
      })
    return () => {
      cancelled = true
    }
  }, [])

  const content = useMemo(() => deriveContent(raw), [raw])

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

export function useContent() {
  const content = useContext(ContentContext)
  if (!content) {
    throw new Error('useContent must be used inside a ContentProvider')
  }
  return content
}
