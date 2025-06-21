const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true }, // unique key from feed
  title: String,
  company: String,
  location: String,
  description: String,
  url: String,
  category: String,
  type: String,
  published: Date,
  rawData: Object, // optional: store full raw job JSON
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
