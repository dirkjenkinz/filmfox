'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, writeFile } = require('../services/file-service');

/**
 * Handles requests to update image display settings.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateImageDisplayHandler = async (req, res) => {
  smartLog('info', 'ENTERING UPDATE IMAGE DISPLAY HANDLER');

  // Parse URL parameters
  let u = url.parse(req.originalUrl, true);
  const sceneNumber = u.query.sceneNumber;
  const title = u.query.title;
  const elementNumber = u.query.elementNumber;
  const image = u.query.image;
  const caller = u.query.caller;

  // Retrieve filmFoxFile and script from the file
  let filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  // Determine the type of the image (still or movie)
  let type = 'still';
  const imageExtension = image.substring(image.length - 4).toLowerCase();
  if (['.mov', '.mp4', '.avi', '.wmv', '.mkv'].includes(imageExtension)) {
    type = 'movie';
  }

  // Update the type for the specified element
  script[sceneNumber][elementNumber].type = type;

  // Update image and type for all elements with the same original image
  let originalImage = script[sceneNumber][elementNumber].image;
  for (let i = elementNumber; i < script[sceneNumber].length; i++) {
    if (script[sceneNumber][i].image === originalImage) {
      script[sceneNumber][i].image = image;
      script[sceneNumber][i].type = type;
    }
  }

  // Write the updated filmFoxFile back to the file system
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  // Redirect based on the caller
  if (caller === 'scenes') {
    res.redirect(`/scenes?title=${title}`);
  } else if (caller === 'showreel') {
    res.redirect(`/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
  } else {
    res.redirect(`/display?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
  }
};

module.exports = { updateImageDisplayHandler };
