const { Worker } = require('bullmq');
const redis = require('../config/redis');
const Job = require('../models/Job');


const worker = new Worker('job-importer', async (job) => {
  const { job: jobData } = job.data;

  try {
    // Try to find existing job
    const existing = await Job.findOne({ jobId: jobData.jobId });

    if (existing) {
      await Job.updateOne({ jobId: jobData.jobId }, jobData);
      return { status: 'updated' };
    } else {
      await Job.create(jobData);
      return { status: 'new' };
    }
  } catch (err) {
    console.error(`❌ Job import failed (ID: ${jobData.jobId}):`, err.message);
    throw new Error(err.message);
  }

}, { connection: redis });


worker.on('completed', (job, result) => {
  console.log(`✅ Job ${job.id} completed: ${result.status}`);
});


worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});
