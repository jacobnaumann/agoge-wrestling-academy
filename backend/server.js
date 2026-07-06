require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const contactRoutes = require('./routes/contact')
const reviewRoutes = require('./routes/reviews')

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
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'agoge-backend' })
})

app.use('/api/contact', contactRoutes)
app.use('/api/reviews', reviewRoutes)

app.listen(PORT, () => {
  console.log(`Agoge backend listening on port ${PORT}`)
})
