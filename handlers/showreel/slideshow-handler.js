'use strict';

// Import required modules
const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile, getFileList, getDuration } = require('../../services/file-service');

// Define asynchronous function for handling slideshow requests
const slideshowHandler = async (req, res) => {
  // Log entry information
  smartLog('info', 'ENTERING SLIDESHOW HANDLER');

  // Extract query parameters from the request URL
  const { query: { title, sceneNumber: rawSceneNumber, elementNumber: rawElementNumber } } = url.parse(req.originalUrl, true);

  // Parse and default scene and element numbers to 0 if not provided
  let sceneNumber = parseInt(rawSceneNumber) || 0;
  let elementNumber = parseInt(rawElementNumber) || 0;

  // Retrieve script data from the filmFoxFile
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  // Adjust scene and element numbers to valid ranges
  if (sceneNumber >= script.length) {
    sceneNumber = script.length - 1;
    elementNumber = script[sceneNumber].length - 1;
  }

  if (elementNumber < 0) {
    sceneNumber--;
    elementNumber = script[sceneNumber].length - 1;
  }

  sceneNumber = Math.max(0, sceneNumber);
  elementNumber = Math.min(elementNumber, script[sceneNumber].length - 1);

  // Retrieve information for the current scene and element
  const element = script[sceneNumber][elementNumber];
  const slug = script[sceneNumber][0].dialogue;

  // Initialize audio-related variables
  let audio = '';
  const num = `0000${sceneNumber}`.slice(-4);
  const sub = `0000${elementNumber}`.slice(-4);
  const fileName = `${num}_${sub}.mp3`;

  // Retrieve the list of available sound files
  const soundsList = await getFileList(`data/${title}/sound/sounds`, 'mp3');

  // Check if the current scene's sound file exists
  if (soundsList.includes(fileName)) {
    audio = `../data/${title}/sound/sounds/${fileName}`;
    element.sound = fileName;
  } else {
    element.sound = '';
  }

  // Calculate the duration of the audio file
  const audioLength = await getDuration(title, fileName) * 1000;

  // Render the slideshow template with relevant data
  res.render('showreel/slideshow.njk', {
    sceneNumber,
    elementNumber,
    highestElement: script[sceneNumber].length - 1,
    highestScene: script.length,
    title,
    element,
    slug,
    page: 'Slideshow',
    caller: 'slideshow',
    audio,
    audioLength,
  });
};

// Export the slideshowHandler function for use in other modules
module.exports = { slideshowHandler };
