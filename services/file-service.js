const fs = require('fs');
const path = require('path');

const getFile = (file) => {
    const directoryPath = path.join(__dirname, '../scripts');
    return new Promise((resolve, reject) => {
        fs.readFile(`${directoryPath}/${file}`,
            (err, data) => {
                if (err) {
                    console.log('error=', err);
                    reject(err);
                } else {
                    resolve(data);
                }
            })
    })
};

const getData = (file) => {
    const directoryPath = path.join(__dirname, '../data');
    return new Promise((resolve, reject) => {
        fs.readFile(`${directoryPath}/${file}.json`,
            (err, data) => {
                if (err) {
                    console.log('error=', err);
                    reject(err);
                } else {
                    resolve(data);
                }
            })
    })
};

const writeFile = (data, file) => {
    const directoryPath = path.join(__dirname, '../music');
    return new Promise((resolve, reject) => {
        fs.writeFile(`${directoryPath}/${file}`, data, (err, msg) => {
            if (err) {
                console.log('error=', err);
                reject(err);
            } else {
                resolve('ok');
            }
        })
    })
};

module.exports = {
    getFile,
    getData,
    writeFile,
};
