'use strict';

const url = require('url');
const { getFileList } = require('../services/file-service');
const { smartLog } = require('../services/smart-log');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const concatFiles = (clips, sceneNumber, title) => {  
  smartLog('info', `concatenating scene ${sceneNumber}`); 
  const fileName = `s0${sceneNumber}.mp3`;
  const outPath = path.join(__dirname, `../data/${title}/scenes`);
  const dirPath = path.join(__dirname, `../data/${title}/sounds`);
  const concat = ffmpeg();

  clips.forEach((clip) => {
    concat.input(`${dirPath}/${clip}`);
  });

  concat
    .on('end', function () {
      smartLog('info', 'Concatenation finished.');
    })
    .on('error', function (err) {
      smartLog('error:', err);
    })
    .mergeToFile(`${outPath}/${fileName}`, outPath);
};

const concatHandler = async (req, res) => {
  smartLog('info', 'ENTERING CONCAT HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  let sc = '0000' + sceneNumber;
  sc = sc.substring(sc.length - 4);
  const mp3List = await getFileList(`data/${title}/sounds/`, 'mp3');

  const comp = [];

  mp3List.forEach((m) => {
    if (m.substring(0,4) === sc){
      comp.push(m);
    }
  });

  concatFiles(comp, sc, title);

  setTimeout(function () {
    res.redirect(`/sound?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`);
  }, 5000);
};

module.exports = { concatHandler };
