
const axios = require('axios');
const parseXML = require('../utils/xmlParser');
const addJobsToQueue = require('./queueProducer');
const ImportLog = require('../models/ImportLog');
const cron = require('node-cron');


const FEED_URLS = [
  'https://jobicy.com/?feed=job_feed',
  'https://jobicy.com/?feed=job_feed&job_categories=copywriting',
  'https://jobicy.com/?feed=job_feed&job_categories=business',
  'https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time',
  'https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france',
  'https://jobicy.com/?feed=job_feed&job_categories=design-multimedia',
  'https://jobicy.com/?feed=job_feed&job_categories=management',
  'https://jobicy.com/?feed=job_feed&job_categories=management',
  'https://www.higheredjobs.com/rss/articleFeed.cfm',
  // Add more later
];

const fetchAndQueueJobs = async () => {
  for (const url of FEED_URLS) {
    console.log(`🌐 Fetching from: ${url}`);

    let newJobs = 0;
    let updatedJobs = 0;
    let failedJobs = [];

    try {
      const res = await axios.get(url);
      const parsed = parseXML(res.data);
      const jobs = parsed.rss?.channel?.item || [];

      const cleanedJobs = jobs.map((job) => ({
        jobId: typeof job.guid === 'object' ? job.guid['#text'] : job.guid,
        title: job.title,
        company: job['job:company'],
        location: job['job:location'],
        description: job.description,
        url: job.link,
        category: job.category,
        type: job['job:employmentType'],
        published: new Date(job.pubDate),
        rawData: job,
      }));

      console.log(`📦 Queuing ${cleanedJobs.length} jobs from ${url}`);

      // 👇 Wait for job results (modified to return status)
      const { processJobs } = require('./queueProducer');
      const results = await processJobs(cleanedJobs, url);

      results.forEach(result => {
        if (result.status === 'new') newJobs++;
        else if (result.status === 'updated') updatedJobs++;
        else failedJobs.push(result);
      });

      // Save import log
      await ImportLog.create({
        sourceURL: url,
        totalFetched: cleanedJobs.length,
        totalImported: newJobs + updatedJobs,
        newJobs,
        updatedJobs,
        failedJobs: failedJobs.map(f => ({
          jobId: f.job?.jobId || 'unknown',
          reason: f.error || 'unknown error'
        }))
      });

      console.log(`✅ Import summary for ${url}: New: ${newJobs}, Updated: ${updatedJobs}, Failed: ${failedJobs.length}`);

    } catch (error) {
      console.error(`❌ Failed to fetch or process ${url}:`, error.message);
    }
  }
};

module.exports = fetchAndQueueJobs;



// ⏰ Cron Job: Run every hour
cron.schedule('0 * * * *', async () => {
  console.log('⏰ Cron triggered: Starting hourly job import...');
  await fetchAndQueueJobs();
});