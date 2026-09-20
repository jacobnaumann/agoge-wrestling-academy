const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { requireAdmin } = require('../middleware/auth')
const { createImageUploadHandlers } = require('../lib/imageUpload')

const router = express.Router()
const coachImageHandlers = createImageUploadHandlers({
  subdirectory: 'coaches',
  width: 640,
  height: 800,
})
const programImageHandlers = createImageUploadHandlers({
  subdirectory: 'programs',
  width: 1200,
  height: 800,
})
const heroImageHandlers = createImageUploadHandlers({
  subdirectory: 'hero',
  width: 1920,
  height: 1080,
})
const legendImageHandlers = createImageUploadHandlers({
  subdirectory: 'legend',
  width: 800,
  height: 600,
})

// In-memory login rate limit: max 5 failed attempts per IP per 15 minutes.
// No DB, so this resets on restart — acceptable for a single-admin site.
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5
const attempts = new Map() // ip -> { count, windowStart }

function isRateLimited(ip) {
  const entry = attempts.get(ip)
  if (!entry || Date.now() - entry.windowStart > WINDOW_MS) return false
  return entry.count >= MAX_ATTEMPTS
}

function recordFailure(ip) {
  const entry = attempts.get(ip)
  if (!entry || Date.now() - entry.windowStart > WINDOW_MS) {
    attempts.set(ip, { count: 1, windowStart: Date.now() })
  } else {
    entry.count += 1
  }
}

// POST /api/admin/login  { password } -> { token }
router.post('/login', async (req, res) => {
  const hash = process.env.ADMIN_PASSWORD_HASH
  const secret = process.env.JWT_SECRET
  if (!hash || !secret) {
    return res.status(503).json({ error: 'Admin login is not configured on this server.' })
  }

  const ip = req.ip
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many failed attempts. Try again in 15 minutes.' })
  }

  const { password } = req.body || {}
  if (typeof password !== 'string' || !password) {
    return res.status(400).json({ error: 'Password is required.' })
  }

  const ok = await bcrypt.compare(password, hash)
  if (!ok) {
    recordFailure(ip)
    return res.status(401).json({ error: 'Incorrect password.' })
  }

  attempts.delete(ip)
  const token = jwt.sign({ role: 'admin' }, secret, { expiresIn: '12h' })
  res.json({ token })
})

// Authenticated image uploads return public URLs under /api/uploads/.
router.post('/coach-images', requireAdmin, ...coachImageHandlers)
router.post('/program-images', requireAdmin, ...programImageHandlers)
router.post('/hero-images', requireAdmin, ...heroImageHandlers)
router.post('/legend-images', requireAdmin, ...legendImageHandlers)

module.exports = router
