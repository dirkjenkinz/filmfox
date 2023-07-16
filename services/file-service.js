const fs = require('fs');
const path = require('path');

const getScript = (file) => {
    const directoryPath = path.join(__dirname, '../scripts');
    return new Promise((resolve, reject) => {
        fs.readFile(`${directoryPath}/${file}`,
            (err, data) => {
                if (err) {
                    console.log('error=', 'err');
                    reject(err);
                } else {
                    resolve(data);
                }
            })
    })
};

const getData = (file) => {
    console.log('get data')
    const directoryPath = path.join(__dirname, '../data');
    return new Promise((resolve, reject) => {
        fs.readFile(`${directoryPath}/${file}`,
            (err, data) => {
                if (err) {
                    console.log('error=', err);
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            })
    })
};

const writeFile = (data, file) => {
    const directoryPath = path.join(__dirname, '../data');
    return new Promise((resolve, reject) => {
        fs.writeFile(`${directoryPath}/${file}`, data, (err, msg) => {
            if (err) {
                console.log('error=', err);
                reject(err);
            } else {
                console.log('written')
                resolve('ok');
            }
        })
    })
};

module.exports = {
    getScript,
    getData,
    writeFile,
};
