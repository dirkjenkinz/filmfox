'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const masterHandler = async (req, res) => {
  smartLog('info', 'ENTERING MASTER HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const size = u.query.size;
  const sceneNumber = u.query.sceneNumber;
  const dirPath = path.join(__dirname, `../data/${title}/scenes`);
  const concat = ffmpeg();

  for (let i = 0; i < size; i++) {
    let fName = `00000${i}`;
    fName = `s${fName.substring(fName.length - 5)}.mp3`;
    concat.input(`${dirPath}/${fName}`);
  }

  concat
    .on('end', function () {
      smartLog('info', 'Concatenation finished.');
    })
    .on('error', function (err) {
      smartLog('error', err);
    })
    .mergeToFile(`${dirPath}/master.mp3`, dirPath);

  setTimeout(function () {
    res.redirect(`/sound?title=${title}&sceneNumber=${sceneNumber}`);
  }, 5000);
};

module.exports = { masterHandler };
