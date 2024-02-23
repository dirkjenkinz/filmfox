const fs = require('fs');
const path = require('path');
const mp3Duration = require('mp3-duration');
const { smartLog } = require('../services/smart-log');
const sound = require('sound-play');

// Check if a file exists
const fileExists = async (file) => {
  smartLog('info', `Check for file ${file}`);
  const directoryPath = path.join(__dirname, '../data');
  return new Promise((resolve, reject) => {
    if (fs.existsSync(`${directoryPath}/${file}`)) {
      resolve(true);
    } else {
      reject(new Error(`File ${file} does not exist.`));
    }
  });
};

// Rename a file
const renameFile = async (title, directory, from, to) => {
  smartLog('info', `renameFile - from ${from} to ${to}`);
  const directoryPath = path.join(__dirname, `../data/${title}/${directory}`);
  return new Promise((resolve, reject) => {
    fs.rename(`${directoryPath}/${from}`, `${directoryPath}/${to}`, (err) => {
      if (err) {
        smartLog('error', 'error renaming file');
        smartLog('error', err);
        reject(err);
      } else {
        resolve('ok');
      }
    });
  });
};

// Read the content of the sheet.njk file
const getSheet = async () => {
  smartLog('info', 'getSheet');
  const directoryPath = path.join(__dirname, '../pages');
  return new Promise((resolve, reject) => {
    fs.readFile(`${directoryPath}/sheet.njk`, (err, data) => {
      if (err) {
        smartLog('error', 'error getting data');
        smartLog('error', err.response);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Read the content of a file and parse it as JSON
const getFile = async (file) => {
  smartLog('info', `getFile - getting data for ${file}`);
  const directoryPath = path.join(__dirname, '../data');
  return new Promise((resolve, reject) => {
    fs.readFile(`${directoryPath}/${file}`, (err, data) => {
      if (err) {
        smartLog('error', 'error getting data');
        smartLog('error', err.response);
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

// Read the content of a script file
const readScriptData = async (file) => {
  smartLog('info', `readScriptData - getting data for ${file}`);
  const directoryPath = path.join(__dirname, '../scripts');
  return new Promise((resolve, reject) => {
    fs.readFile(`${directoryPath}/${file}`, (err, data) => {
      if (err) {
        smartLog('error', 'error getting data');
        smartLog('error', err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Play a sound file using the sound-play library
const playSoundFile = async (title, file, sub) => {
  smartLog('info', `playing sound file - ${title}/${sub}/${file}`);
  const sFile = path.join(__dirname, `../data/${title}/${sub}/${file}`);

  try {
    await sound.play(sFile);
    smartLog('info', 'done');
  } catch (error) {
    smartLog('error', error);
  }
};

// Write data to a file
const writeFile = async (data, file) => {
  smartLog('info', `writing ${file}`);
  const directoryPath = path.join(__dirname, '../data');
  return new Promise((resolve, reject) => {
    fs.writeFile(`${directoryPath}/${file}`, data, (err, msg) => {
      if (err) {
        smartLog('error', err.cause);
        reject(err);
      } else {
        resolve('ok');
      }
    });
  });
};

// Delete a file
const deleteFile = async (title, directory, fileName) => {
  smartLog('info', `deleting ${title}/${directory}/${fileName}`);
  const directoryPath = path.join(__dirname, `../data/${title}/${directory}`);
  return new Promise((resolve, reject) => {
    fs.unlink(`${directoryPath}/${fileName}`, (err, msg) => {
      if (err) {
        smartLog('error', err.cause);
        reject(err);
      } else {
        resolve('ok');
      }
    });
  });
};

// Create a directory if it doesn't exist
const createDirectory = (directory) => {
  smartLog('info', `create directory - ${directory}`);
  const directoryPath = path.join(__dirname, '../data');
  if (!fs.existsSync(`${directoryPath}/${directory}`)) {
    fs.mkdirSync(`${directoryPath}/${directory}`);
  }
};

// Get the duration of an MP3 file
const getDuration = async (subdirectory, file) => {
  const directoryPath = path.join(
    __dirname,
    `../data/${subdirectory}/sound/sounds/${file}`
  );
  return new Promise((resolve, reject) => {
    mp3Duration(directoryPath, (err, duration) => {
      if (err) {
        smartLog('error', `${err.cause}`);
        reject(err);
      } else {
        resolve(duration);
      }
    });
  });
};

// Get a list of files in a directory with an optional file suffix filter
const getFileList = async (dir, suffix) => {
  smartLog('info', `get file list for ${dir} - ${suffix}`);
  const directoryPath = path.join(__dirname, `../${dir}`);
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        smartLog('error', 'error=', 'err');
        reject(err);
      } else {
        if (suffix !== '*') {
          const fList = [];
          files.forEach((file) => {
            if (file.substring(file.length - 4) === `.${suffix}`) {
              fList.push(file);
            }
          });
          resolve(fList);
        } else {
          resolve(files);
        }
      }
    });
  });
};

// Get a list of directories in the data folder
function getFFFList() {
  const files = [];
  const dir = path.join(__dirname, '../data');
  const fileList = fs.readdirSync(dir);
  const dirList = [];
  fileList.forEach((f) => {
    if (fs.statSync(`${dir}/${f}`).isDirectory()) {
      if (f !== 'samples') {
        dirList.push(f);
      };
    };
  });
  return dirList;
};

module.exports = {
  getFile,
  writeFile,
  createDirectory,
  getFileList,
  playSoundFile,
  getDuration,
  deleteFile,
  getFFFList,
  fileExists,
  readScriptData,
  renameFile,
  getSheet,
};
