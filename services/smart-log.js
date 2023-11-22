const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
showLog = process.env.SHOWLOG;
hardLog = process.env.HARDLOG;


const writeHardLog = async (hardLog) => {
    const filePath = 'C:/Users/User/Documents/hardLog.json';
    console.log(hardLog.logs)
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(hardLog), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve('ok');
        }
      });
    });
};

const readHardLog = async () => {
    const filePath = 'C:/Users/User/Documents/hardLog.json';
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  };

const updateHardLog = async (time_stamp, msg) => {
    const hardLogFile = await readHardLog();
    const {logs} = hardLogFile;
    logs.push([time_stamp, msg]);
    await writeHardLog(hardLogFile);
};

const smartLog = async (lev, msg) => {
    const dateObject = new Date();
    const date = ('0' + dateObject.getDate()).slice(-2);
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    const time_stamp = (year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds);

    if (hardLog === 'YES') {
        updateHardLog(time_stamp, msg);
    };

    if (lev === 'paramount') {
        console.log(`paramount - time: ${time_stamp} - ${msg}`);
    };

    if (lev === 'error') {
        console.log(`error - time: ${time_stamp} - ${msg}`);
    };

    if (showLog === 'all') {
        if (lev === 'info') {
            console.log(`info - time: ${time_stamp} - ${msg}`);
        };
    };
};

module.exports = {
    smartLog,
};