// const { Queue } = require('bullmq');
// const redis = require('../config/redis');

// const jobQueue = new Queue('job-importer', {
//   connection: redis
// });

// module.exports = jobQueue;


const { Queue, QueueEvents } = require('bullmq');
const redis = require('../config/redis');

const jobQueue = new Queue('job-importer', {
  connection: redis,
});

// ✅ Add this to support `waitUntilFinished`
const queueEvents = new QueueEvents('job-importer', {
  connection: redis,
});

queueEvents.on('completed', ({ jobId }) => {
  // Optional: Log completed jobs
  console.log(`✅ Job ${jobId} finished`);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.error(`❌ Job ${jobId} failed:`, failedReason);
});

module.exports = { jobQueue, queueEvents };
