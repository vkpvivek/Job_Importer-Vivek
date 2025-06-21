const mongoose = require('mongoose');

const importLogSchema = new mongoose.Schema({
  sourceURL: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  totalFetched: { type: Number, default: 0 },
  totalImported: { type: Number, default: 0 },
  newJobs: { type: Number, default: 0 },
  updatedJobs: { type: Number, default: 0 },
  failedJobs: [{
    jobId: String,
    reason: String
  }]
}, { timestamps: true });


module.exports = mongoose.model('ImportLog', importLogSchema);
