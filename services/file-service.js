const fs = require('fs');
const path = require('path');
const mp3Duration = require('mp3-duration');

const getScript = (file) => {
    const directoryPath = path.join(__dirname, '../scripts');
    return new Promise((resolve, reject) => {
        fs.readFile(`${directoryPath}/${file}`,
            (err, data) => {
                if (err) {
                    console.log('error getting script');
                    console.log(err.cause);
                    reject(err);
                } else {
                    resolve(data);
                }
            })
    })
};

const getData = async (file) => {
    console.log('get data');
    const directoryPath = path.join(__dirname, '../data');
    return new Promise((resolve, reject) => {
        fs.readFile(`${directoryPath}/${file}`,
            (err, data) => {
                if (err) {
                    console.log('error getting data');
                    console.log(err.cause);
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            })
    })
};

const getSoundFile = (fff, file) => {
    console.log('getting sound file');
    const directoryPath = path.join(__dirname, `../data/${fff}`);
    const data = fs.readFileSync(`${directoryPath}/${file}`, `utf8`);
    return data;
};

const writeFile = async (data, file) => {
    const directoryPath = path.join(__dirname, '../data');
    return new Promise((resolve, reject) => {
        fs.writeFile(`${directoryPath}/${file}`, data, (err, msg) => {
            if (err) {
                console.log('error=', 'err');
                reject(err);
            } else {
                resolve('ok');
            }
        })
    })
};

const createDirectory = (directory => {
    console.log('create directory');
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
                console.log('error=', 'err');
                reject(err);
            } else {
                resolve(duration);
            }
        });
    });
};

const getFileList = async (dir, suffix) => {
    console.log('get file list');
    const directoryPath = path.join(__dirname, `../${dir}`);
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.log('error=', 'err');
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
    console.log('getting list of elements');
    const directoryPath = path.join(__dirname, `../data/${subdir}`);
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.log('error retrieving list of elements');
                reject(err);
            } else {
                console.log('elements retrieved');
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
    getSoundFile,
    getDuration,
};
