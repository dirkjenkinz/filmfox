const audioconcat = require('audioconcat')
const path = require('path');
const fs = require('fs');


const concat = songs => {
    audioconcat(songs)
        .concat('all.mp3')
        .on('start', function (command) {
            console.log('ffmpeg process started:', command)
        })
        .on('error', function (err, stdout, stderr) {
            console.error('Error:', err)
            console.error('ffmpeg stderr:', stderr)
        })
        .on('end', function (output) {
            console.error('Audio created in:', output)
        })
};


const compileFileList = title => {
    console.log('compile File List')
    const directoryPath = path.join(__dirname, `../data/${title}`);
    console.log({title})
    console.log({directoryPath})
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
       return files
    });
};

const concatenateFiles = title => {
    const fileList = compileFileList(title);
    concat(fileList);
}

module.exports = { concatenateFiles }