require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/db')

const contactRoutes = require('./routes/contact')
const reviewRoutes = require('./routes/reviews')
const contentRoutes = require('./routes/content')
const adminRoutes = require('./routes/admin')

const app = express()
const PORT = process.env.PORT || 5000

// MongoDB connection is optional until the frontend is wired up.
// Set MONGO_URI in .env to enable it.
if (process.env.MONGO_URI) {
  connectDB()
} else {
  console.log('MONGO_URI not set — running without a database (scaffold mode)')
}

app.use(cors())
// 300kb limit accommodates full site-content saves (content itself is capped at 200kb)
app.use(express.json({ limit: '300kb' }))
app.use(
  '/api/uploads',
  express.static(path.join(__dirname, 'data', 'uploads'), {
    immutable: true,
    maxAge: '1y',
  }),
)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'agoge-backend' })
})

app.use('/api/contact', contactRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/admin', adminRoutes)

app.listen(PORT, () => {
  console.log(`Agoge backend listening on port ${PORT}`)
})
