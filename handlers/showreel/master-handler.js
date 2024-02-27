'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// Handler for the master sound processing
const masterHandler = async (req, res) => {
  // Log entry point for better traceability
  smartLog('info', 'ENTERING MASTER HANDLER');

  // Parse query parameters from the request URL
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const size = u.query.size;
  const sceneNumber = u.query.sceneNumber;
  const dirPath = path.join(__dirname, `../data/${title}/sound/scenes`);
  
  // Create a new instance of ffmpeg for concatenation
  const concat = ffmpeg();

  // Iterate through the sound scenes and add them to the concatenation
  for (let i = 0; i < size; i++) {
    let fName = `00000${i}`;
    fName = `s${fName.substring(fName.length - 5)}.mp3`;
    concat.input(`${dirPath}/${fName}`);
  }

  // Perform concatenation and handle events
  concat
    .on('end', function () {
      smartLog('info', 'Concatenation finished.');
    })
    .on('error', function (err) {
      smartLog('error', err);
    })
    .mergeToFile(`${dirPath}/master.mp3`, dirPath);

  // Redirect to the 'sound' page after a delay
  setTimeout(function () {
    res.redirect(`/sound?title=${title}&sceneNumber=${sceneNumber}`);
  }, 5000);
};

module.exports = { masterHandler };
