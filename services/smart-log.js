const fs = require('fs');
const path = require('path');

const readControlFile = () => {
  const filePath = path.join(__dirname, '../data/control.json');
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

// Promisify readFile and writeFile functions for asynchronous file operations
const readFileAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFileAsync = (filePath, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        reject(err);
      } else {
        resolve('ok');
      }
    });
  });
};

// Function to update the hard log file
const updateHardLog = async (time_stamp, msg) => {
  const filePath = 'C:/Users/User/Documents/hardLog.txt';
  try {
    let log = '';
    if (fs.existsSync(filePath)) {
      log = await readFileAsync(filePath);
    }
    log = log + `${time_stamp}: ${msg}\n`;
    await writeFileAsync(filePath, log);
  } catch (error) {
    console.error('Error updating hard log:', error);
  }
};

// Function to log messages based on log level and configuration
const smartLog = async (lev, msg) => {
  const {showLog, hardLog} = await readControlFile();
  try {
    const dateObject = new Date();
    const date = ('0' + dateObject.getDate()).slice(-2);
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    const time_stamp = (year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds);

    // Check if hard logging is enabled
    if (hardLog === 'YES') {
      await updateHardLog(time_stamp, msg);
    }

    // Log messages based on log level
    if (lev === 'paramount') {
      console.log(`paramount - time: ${time_stamp} - ${msg}`);
    }

    if (lev === 'error') {
      console.log(`error - time: ${time_stamp} - ${msg}`);
    }

    // Log info messages if showLog is set to 'all'
    if (showLog === 'all' && lev === 'info') {
      console.log(`info - time: ${time_stamp} - ${msg}`);
    }
  } catch (error) {
    console.error('Error in smartLog:', error);
  }
};

module.exports = {
  smartLog,
};
