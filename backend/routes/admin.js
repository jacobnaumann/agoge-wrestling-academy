const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const path = require('path')
const fs = require('fs/promises')
const multer = require('multer')
const sharp = require('sharp')
const { requireAdmin } = require('../middleware/auth')

const router = express.Router()
const COACH_UPLOAD_DIR = path.join(__dirname, '..', 'data', 'uploads', 'coaches')
const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

const coachImageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_BYTES, files: 1 },
  fileFilter: (_req, file, done) => {
    if (!ACCEPTED_IMAGE_TYPES.has(file.mimetype)) {
      return done(new Error('Choose a JPG, PNG, or WebP image.'))
    }
    done(null, true)
  },
})

function receiveCoachImage(req, res, next) {
  coachImageUpload.single('image')(req, res, (err) => {
    if (!err) return next()
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'Image must be 5MB or smaller.' })
    }
    return res.status(400).json({ error: err.message || 'Image upload failed.' })
  })
}

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

// POST /api/admin/coach-images — stores a normalized portrait and returns its public URL.
router.post('/coach-images', requireAdmin, receiveCoachImage, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Choose an image to upload.' })
  }

  const filename = `${crypto.randomUUID()}.webp`
  const outputPath = path.join(COACH_UPLOAD_DIR, filename)
  let portrait

  try {
    portrait = await sharp(req.file.buffer, { limitInputPixels: 25_000_000 })
      .rotate()
      .resize(640, 800, { fit: 'cover', position: 'attention' })
      .webp({ quality: 82 })
      .toBuffer()
  } catch (err) {
    console.warn('Rejected invalid coach image:', err.message)
    return res.status(400).json({ error: 'The selected file is not a valid image.' })
  }

  try {
    await fs.mkdir(COACH_UPLOAD_DIR, { recursive: true })
    await fs.writeFile(outputPath, portrait, { flag: 'wx' })
    res.status(201).json({ image: `/api/uploads/coaches/${filename}` })
  } catch (err) {
    if (err.code === 'EEXIST') {
      return res.status(409).json({ error: 'Image filename collision. Please try again.' })
    }
    console.error('Failed to save coach image:', err)
    return res.status(500).json({ error: 'The image could not be saved.' })
  }
})

module.exports = router
