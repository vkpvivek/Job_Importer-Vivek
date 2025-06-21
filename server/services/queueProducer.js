// const jobQueue = require('../jobs/jobQueue');

// const addJobsToQueue = async (jobs, sourceURL) => {
//   for (const job of jobs) {
//     await jobQueue.add('import-job', {
//       job,
//       sourceURL
//     });
//   }
// };

// module.exports = addJobsToQueue;



const { jobQueue, queueEvents } = require('../jobs/jobQueue');

const processJobs = async (jobs, sourceURL) => {
  const results = [];

  for (const job of jobs) {
    try {
      const addedJob = await jobQueue.add('import-job', { job, sourceURL });

      // ✅ Use queueEvents with waitUntilFinished
      const result = await addedJob.waitUntilFinished(queueEvents);

      results.push({ status: result.status, job });
    } catch (error) {
      results.push({ status: 'failed', job, error: error.message });
    }
  }

  return results;
};

module.exports = { processJobs };
