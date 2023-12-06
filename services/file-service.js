const fs = require('fs');
const path = require('path');
const mp3Duration = require('mp3-duration');
const { smartLog } = require('../services/smart-log');
const sound = require('sound-play');

const fileExists = async (file) => {
  smartLog('info', `Check for file ${file}`);
  const directoryPath = path.join(__dirname, '../data');
  return new Promise((resolve, reject) => {
    fs.existsSync(`${directoryPath}/${file}`), (err, flag) => {
      if (err) {
        smartLog('error', 'error getting data');
        smartLog('error', err.response);
        reject(err);
      } else {
        resolve(flag);
      }
    };
  });
};




/*
  try {
    if (fs.existsSync(`${directoryPath}/${file}`)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    smartLog('error', 'err');
    return false;
  }
};
*/
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

const readScriptData = async (file) => {
  smartLog('info', `readScriptData - getting data for ${file}`);
  const directoryPath = path.join(__dirname, '../scripts');
  return new Promise((resolve, reject) => {
    fs.readFile(`${directoryPath}/${file}`, (err, data) => {
      if (err) {
        smartLog('error', 'error getting data');
        smartLog('error', err.cause);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

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

const createDirectory = (directory) => {
  smartLog('info', 'create directory');
  const directoryPath = path.join(__dirname, '../data');
  if (!fs.existsSync(`${directoryPath}/${directory}`)) {
    fs.mkdirSync(`${directoryPath}/${directory}`);
  }
};

const getDuration = async (subdirectory, file) => {
  const directoryPath = path.join(
    __dirname,
    `../data/${subdirectory}/sounds/${file}`
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

const getFileList = async (dir, suffix) => {
  smartLog('info', `get file list for ${dir} - ${suffix}`);
  const directoryPath = path.join(__dirname, `../${dir}`);
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        smartLog('error', 'error=', 'err');
        reject(err);
      } else {
        const fList = [];
        files.forEach((file) => {
          if (file.substring(file.length - 4) === `.${suffix}`) {
            fList.push(file);
          }
        });
        resolve(fList);
      }
    });
  });
};

function getFFFList() {
  files = [];
  dir = path.join(__dirname, '../data');
  const fileList = fs.readdirSync(dir);
  const dirList = [];
  fileList.forEach((f) => {
    if (fs.statSync(`${dir}/${f}`).isDirectory()) {
      if (f !== 'samples') {
        dirList.push(f);
      }
    }
  });
  return dirList;
}

const getListOfElements = async (subdir) => {
  smartLog('info', 'getting list of elements');
  const directoryPath = path.join(__dirname, `../data/${subdir}/sounds`);
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        smartLog('error', 'error retrieving list of elements');
        reject(err);
      } else {
        smartLog('info', 'elements retrieved');
        const fList = [];
        files.forEach((file) => {
          if (file.substring(file.length - 4) === '.mp3') {
            fList.push(file);
          }
        });
        resolve(fList);
      }
    });
  });
};

const getListOfImages = async (subdir) => {
  smartLog('info', 'getting list of elements');
  const directoryPath = path.join(__dirname, `../data/${subdir}/images`);
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        smartLog('error', 'error retrieving list of elements');
        reject(err);
      } else {
        smartLog('info', 'elements retrieved');
        const fList = [];
        resolve(files);
      }
    });
  });
};

module.exports = {
  getFile,
  writeFile,
  createDirectory,
  getFileList,
  getListOfElements,
  getListOfImages,
  playSoundFile,
  getDuration,
  deleteFile,
  getFFFList,
  fileExists,
  readScriptData,
};
