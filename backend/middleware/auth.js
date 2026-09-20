const jwt = require('jsonwebtoken')

// Verifies the admin JWT issued by POST /api/admin/login.
function requireAdmin(req, res, next) {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    return res.status(503).json({ error: 'Admin features are not configured on this server.' })
  }

  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) {
    return res.status(401).json({ error: 'Authentication required.' })
  }

  try {
    const payload = jwt.verify(token, secret)
    if (payload.role !== 'admin') throw new Error('wrong role')
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' })
  }
}

module.exports = { requireAdmin }
