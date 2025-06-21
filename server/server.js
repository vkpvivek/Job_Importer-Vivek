
const app = require('./app');
const connectDB = require('./config/db');
const fetchAndQueueJobs = require('./services/fetchJobs');

require('./config/redis');
require('dotenv').config();

connectDB();
require('./workers/jobWorker');


setTimeout(() => {
  console.log('🚀 Starting job fetch...');
  fetchAndQueueJobs();
}, 2000);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});