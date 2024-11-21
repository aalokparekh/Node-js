const fs = require('fs');

const logger = (req, res, next) => {
    const timestamp = new Date().toString();
    const logEntry = `URL: ${req.url}, Method: ${req.method}, Timestamp: ${timestamp}\n`;
    
    // Append the log entry to logs.txt
    fs.appendFileSync('logs.txt', logEntry, 'utf-8');
    next();
};
module.exports = {
  logger,
};

//+0.5
