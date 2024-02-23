'use strict';

const url = require('url');
const { getFileList } = require('../services/file-service');
const { smartLog } = require('../services/smart-log');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

/**
 * Concatenate audio clips into a single file for a scene.
 *
 * @param {string[]} clips - List of audio clips to concatenate.
 * @param {number} sceneNumber - The scene number.
 * @param {string} title - The title of the film.
 */
const concatFiles = (clips, sceneNumber, title) => {
  try {
    smartLog('info', `Concatenating scene ${sceneNumber}`);
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
      .on('end', function () {
        smartLog('info', 'Concatenation finished.');
      })
      .on('error', function (err) {
        smartLog('error', `Error during concatenation: ${err}`);
      })
      .mergeToFile(`${outPath}/${fileName}`, outPath);
  } catch (error) {
    smartLog('error', `Error in concatFiles: ${error.message}`);
  }
};

/**
 * Handles the concatenation of audio clips for a specific scene.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
const concatenateSoundHandler = async (req, res) => {
  try {
    smartLog('info', 'ENTERING CONCATENATE SOUND HANDLER');
    const u = url.parse(req.originalUrl, true);
    const title = u.query.title;
    const sceneNumber = u.query.sceneNumber;
    const elementNumber = u.query.elementNumber;
    let sc = `0000${sceneNumber}`.slice(-4);
    const mp3List = await getFileList(`data/${title}/sound/sounds/`, 'mp3');

    console.log(sceneNumber, elementNumber);

    const comp = [];

    // Filter audio clips for the specified scene
    mp3List.forEach((m) => {
      if (/^sc\d{4}\.mp3$/.test(m)) {
        comp.push(m);
      }
    });

    // Concatenate audio clips for the scene
    concatFiles(comp, sc, title);

    // Redirect to the sound processing page after a delay
    const REDIRECT_DELAY_MS = 5000;
    setTimeout(function () {
      res.redirect(`/sound?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`);
    }, REDIRECT_DELAY_MS);
  } catch (error) {
    smartLog('error', `Error in concatenateSoundHandler: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { concatenateSoundHandler };
