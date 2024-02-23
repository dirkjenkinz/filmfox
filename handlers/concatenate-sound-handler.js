'use strict';

const url = require('url');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const { getFileList } = require('../services/file-service');
const { smartLog } = require('../services/smart-log');

const concatFiles = (clips, sceneNumber, title) => {
  smartLog('info', `concatenating scene ${sceneNumber}`);
  const fileName = `s0${sceneNumber}.mp3`;
  const outPath = path.join(__dirname, `../data/${title}/sound/scenes`);
  const dirPath = path.join(__dirname, `../data/${title}/sound/sounds`);
  const concat = ffmpeg();

  clips.forEach((clip) => {
    concat.input(`${dirPath}/${clip}`);
  });

  const blank = path.join(__dirname, '../blank.mp3');
  concat.input(blank);

  concat
    .on('end', () => {
      smartLog('info', 'Concatenation finished.');
    })
    .on('error', (err) => {
      smartLog('error:', err);
    })
    .mergeToFile(`${outPath}/${fileName}`, outPath);
};

const concatenateSoundHandler = async (req, res) => {
  try {
    smartLog('info', 'ENTERING CONCATENATE SOUND HANDLER');

    const u = url.parse(req.originalUrl, true);
    const title = u.query.title;
    const sceneNumber = u.query.sceneNumber;
    const elementNumber = u.query.elementNumber;
    const paddedSceneNumber = `0000${sceneNumber}`.slice(-4);

    const mp3List = await getFileList(`data/${title}/sound/sounds/`, 'mp3');

    const comp = mp3List.filter((m) => m.startsWith(paddedSceneNumber));

    concatFiles(comp, paddedSceneNumber, title);

    setTimeout(() => {
      res.redirect(`/sound?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`);
    }, 5000);
  } catch (error) {
    smartLog('error', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { concatenateSoundHandler };
