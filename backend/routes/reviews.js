const express = require('express')
const router = express.Router()

// SCAFFOLD: wire these to the Review model once the frontend reviews
// section is switched from localStorage to the API.

// GET /api/reviews — list approved reviews
router.get('/', (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' })
})

// POST /api/reviews — submit a review (pending approval)
router.post('/', (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' })
})

module.exports = router
