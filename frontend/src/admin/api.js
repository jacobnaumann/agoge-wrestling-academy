const TOKEN_KEY = 'agoge-admin-token'

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY)
}

async function parseJson(res) {
  try {
    return await res.json()
  } catch {
    return {}
  }
}

export async function login(password) {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  const data = await parseJson(res)
  if (!res.ok) throw new Error(data.error || 'Login failed.')
  return data.token
}

export async function fetchContent() {
  const res = await fetch('/api/content')
  if (!res.ok) throw new Error('Failed to load site content.')
  return res.json()
}

export async function saveContent(content) {
  const res = await fetch('/api/content', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(content),
  })
  if (res.status === 401) {
    const err = new Error('Session expired. Please log in again.')
    err.unauthorized = true
    throw err
  }
  const data = await parseJson(res)
  if (!res.ok) throw new Error(data.error || 'Failed to save changes.')
  return data
}

async function uploadAdminImage(endpoint, file) {
  const body = new FormData()
  body.append('image', file)

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body,
  })
  const data = await parseJson(res)
  if (res.status === 401) {
    const err = new Error('Session expired. Please log in again.')
    err.unauthorized = true
    throw err
  }
  if (!res.ok) throw new Error(data.error || 'Failed to upload image.')
  return data.image
}

export function uploadCoachImage(file) {
  return uploadAdminImage('/api/admin/coach-images', file)
}

export function uploadProgramImage(file) {
  return uploadAdminImage('/api/admin/program-images', file)
}

export function uploadHeroImage(file) {
  return uploadAdminImage('/api/admin/hero-images', file)
}

export function uploadLegendImage(file) {
  return uploadAdminImage('/api/admin/legend-images', file)
}
