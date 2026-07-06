const express = require('express')
const router = express.Router()

// SCAFFOLD: wire these to the ContactMessage model once the frontend
// contact form is switched from mailto to the API.

// POST /api/contact — submit a contact/enrollment inquiry
router.post('/', (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' })
})

module.exports = router
