const mongoose = require('mongoose')

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, maxlength: 200 },
    program: { type: String, default: 'General', trim: true, maxlength: 100 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    handled: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('ContactMessage', contactMessageSchema)
