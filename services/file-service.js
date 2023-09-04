const fs = require('fs');
const path = require('path');
const mp3Duration = require('mp3-duration');
const { smartLog } = require('../services/smart-log');
const sound = require('sound-play');

const getScript = (file) => {
    const directoryPath = path.join(__dirname, '../scripts');
    return new Promise((resolve, reject) => {
        fs.readFile(`${directoryPath}/${file}`,
            (err, data) => {
                if (err) {
                    smartLog('error', 'error getting script');
                    smartLog('error', err.cause);
                    reject(err);
                } else {
                    resolve(data);
                }
            })
    })
};

const getData = async (file) => {
    smartLog('info', `getData - getting data for ${file}`);
    const directoryPath = path.join(__dirname, '../data');
    return new Promise((resolve, reject) => {
        fs.readFile(`${directoryPath}/${file}`,
            (err, data) => {
                if (err) {
                    smartLog('error', 'error getting data');
                    smartLog('error', err.cause);
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                };
            });
    });
};

const playSoundFile = (fff, file) => {
    smartLog('info', 'playing sound file');
    const sFile = path.join(__dirname, `../data/${fff}/${file}`);
    sound.play(sFile);
};

const getSRT = (file) => {
    smartLog('info', 'getting SRT file');
    const directoryPath = path.join(__dirname, `../data`);
    const data = fs.readFileSync(`${directoryPath}/${file}.srt`, `utf8`);
    return data;
};

const writeFile = async (data, file) => {
    smartLog('info', `writing ${file}`)
    const directoryPath = path.join(__dirname, '../data');
    return new Promise((resolve, reject) => {
        fs.writeFile(`${directoryPath}/${file}`, data, (err, msg) => {
            if (err) {
                smartLog('error', err.cause);
                reject(err);
            } else {
                resolve('ok');
            }
        })
    })
};

const deleteFile = async (script, file) => {
    smartLog('info', `deleting ${file}`)
    const directoryPath = path.join(__dirname, `../data/${script}`);
    return new Promise((resolve, reject) => {
        fs.unlink(`${directoryPath}/${file}`, (err, msg) => {
            if (err) {
                smartLog('error', err.cause);
                reject(err);
            } else {
                resolve('ok');
            }
        })
    })
};

const createDirectory = (directory => {
    smartLog('info', 'create directory');
    const directoryPath = path.join(__dirname, '../data');
    if (!fs.existsSync(`${directoryPath}/${directory}`)) {
        fs.mkdirSync(`${directoryPath}/${directory}`);
    }
});

const getDuration = (subdirectory, file) => {
    const directoryPath = path.join(__dirname, `../data/${subdirectory}/${file}`);
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
    smartLog('info', 'get file list');
    const directoryPath = path.join(__dirname, `../${dir}`);
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                smartLog('error', 'error=', 'err');
                reject(err);
            } else {
                const fList = [];
                files.forEach(file => {
                    if (file.substring(file.length - 4) === `.${suffix}`) {
                        fList.push(file);
                    };
                });
                resolve(fList);
            }
        })
    });
};

const getListOfElements = async (subdir) => {
    smartLog('info', 'getting list of elements');
    const directoryPath = path.join(__dirname, `../data/${subdir}`);
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                smartLog('error', 'error retrieving list of elements');
                reject(err);
            } else {
                smartLog('info', 'elements retrieved');
                const fList = [];
                files.forEach(file => {
                    if (file.substring(file.length - 4) === `.mp3`) {
                        fList.push(file);
                    };
                });
                resolve(fList);
            }
        })
    })
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
        })
    })
};

module.exports = {
    getScript,
    getData,
    writeFile,
    createDirectory,
    getFileList,
    getListOfElements,
    getListOfImages,
    playSoundFile,
    getDuration,
    getSRT,
    deleteFile,
};
