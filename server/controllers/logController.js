const ImportLog = require('../models/ImportLog');

const getImportLogs = async (req, res) => {
  try {
    const logs = await ImportLog.find().sort({ createdAt: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs' });
  }
};

module.exports = { getImportLogs };
