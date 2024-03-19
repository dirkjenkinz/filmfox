'use strict';

// Import required modules
const url = require('url');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const { getFileList } = require('../../services/file-service');
const { smartLog } = require('../../services/smart-log');

// Function to concatenate audio clips
const concatFiles = (clips, sceneNumber, title) => {
  smartLog('info', `Concatenating scene ${sceneNumber}`);

  // Define file and directory paths
  const fileName = `s0${sceneNumber}.mp3`;
  const outPath = path.join(__dirname, `../../data/${title}/sound/scenes`);
  const dirPath = path.join(__dirname, `../../data/${title}/sound/sounds`);

  // Create ffmpeg instance for concatenation
  const concat = ffmpeg();

  // Add input files to the concatenation process
  clips.forEach((clip) => {
    concat.input(`${dirPath}/${clip}`);
  });

  // Add a blank audio file to the end
  const blank = path.join(__dirname, '../../blank.mp3');
  concat.input(blank);

  // Event listeners for concatenation completion and error handling
  concat
    .on('end', function () {
      smartLog('info', 'Concatenation finished.');
    })
    .on('error', function (err) {
      smartLog('error:', err);
    })
    .mergeToFile(`${outPath}/${fileName}`, outPath);
};

// Request handler for sound concatenation
const concatenateSoundHandler = async (req, res) => {
  smartLog('info', 'ENTERING CONCATENATE SOUND HANDLER');

  // Parse the URL to extract query parameters
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;

  // Format scene number to ensure consistency
  let sc = '0000' + sceneNumber;
  sc = sc.substring(sc.length - 4);

  // Get the list of available mp3 files
  const mp3List = await getFileList(`data/${title}/sound/sounds/`, 'mp3');

  // Filter mp3 files based on scene number
  const comp = mp3List.filter((m) => m.substring(0, 4) === sc);

  // Concatenate selected audio files
  concatFiles(comp, sc, title);

  // Redirect after a delay of 5 seconds
  setTimeout(function () {
    res.redirect(`/sound?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`);
  }, 5000);
};

// Export the handler function
module.exports = { concatenateSoundHandler };
