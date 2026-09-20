const express = require('express')
const { readContent, writeContent } = require('../lib/contentStore')
const { requireAdmin } = require('../middleware/auth')

const router = express.Router()

// Top-level sections every valid content payload must contain. Guards against
// a buggy or malicious save wiping out whole sections of the site.
const REQUIRED_KEYS = [
  'site',
  'hero',
  'accolades',
  'about',
  'programs',
  'scheduleTiers',
  'schedule',
  'competitions',
  'staff',
  'personalTraining',
  'camps',
  'seedReviews',
  'programOptions',
  'reviewProgramOptions',
]

const MAX_BYTES = 200 * 1024

// GET /api/content — public, returns the live site content.
router.get('/', async (req, res) => {
  try {
    const content = await readContent()
    res.json(content)
  } catch (err) {
    console.error('Failed to read content:', err)
    res.status(500).json({ error: 'Failed to load site content.' })
  }
})

// PUT /api/content — admin only, replaces the live site content.
router.put('/', requireAdmin, async (req, res) => {
  const content = req.body
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return res.status(400).json({ error: 'Content must be a JSON object.' })
  }

  const missing = REQUIRED_KEYS.filter((k) => !(k in content))
  if (missing.length > 0) {
    return res.status(400).json({ error: `Content is missing sections: ${missing.join(', ')}` })
  }

  const size = Buffer.byteLength(JSON.stringify(content), 'utf8')
  if (size > MAX_BYTES) {
    return res.status(413).json({ error: 'Content is too large (200KB max).' })
  }

  try {
    await writeContent(content)
    res.json({ ok: true })
  } catch (err) {
    console.error('Failed to write content:', err)
    res.status(500).json({ error: 'Failed to save site content.' })
  }
})

module.exports = router
