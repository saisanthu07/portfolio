const { mongoose } = require('../_db')

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, trim: true, maxlength: 200, default: 'No Subject' },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
  ip: String,
  readAt: Date,
}, { timestamps: true })

module.exports = mongoose.models.Contact || mongoose.model('Contact', ContactSchema)
