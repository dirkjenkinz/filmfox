'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, getFileList } = require('../services/file-service');

// Function to extract unique images used in the script
const getUsed = (script) => {
  const used = [];
  script.forEach((scene) => {
    scene.forEach((s) => {
      used.push(s.image);
    });
  });
  const unique = [...new Set(used)];
  return unique;
};

// Handler for rendering the gallery
const galleryHandler = async (req, res) => {
  // Log entry point for better traceability
  smartLog('info', 'ENTERING GALLERY HANDLER');

  // Parse query parameters from the request URL
  const u = url.parse(req.originalUrl, true);
  const sceneNumber = u.query.sceneNumber;
  const title = u.query.title;
  const elementNumber = u.query.elementNumber;
  const caller = u.query.caller;
  const mute = u.query.mute;
  const speak = u.query.speak;

  try {
    // Fetch image list from the 'vision/images' directory
    const imageList = await getFileList(`data/${title}/vision/images`, '*');
    imageList.unshift('blank.jpg');

    // Categorize images as either 'movie' or 'still'
    const images = imageList.map((imageName) => {
      const extension = imageName.substring(imageName.length - 4).toLowerCase();
      return extension === '.mov' || extension === '.mp4' || extension === '.avi' ||
        extension === '.wmv' || extension === '.mkv'
        ? [imageName, 'movie']
        : [imageName, 'still'];
    });

    // Fetch movie file information asynchronously
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    const { script } = filmFoxFile;

    // Get a list of unique images used in the script
    const usedImages = getUsed(script);

    // Partition images into 'used' and 'unused' based on script usage
    const used = images.filter((image) => usedImages.includes(image[0]));
    const unused = images.filter((image) => !usedImages.includes(image[0]));

    // Render the 'gallery' template with relevant data
    res.render('gallery.njk', {
      title,
      elementNumber,
      sceneNumber,
      used,
      unused,
      caller,
      page: 'Gallery',
      mute,
      speak,
    });
  } catch (error) {
    // Log any errors that occur during file handling
    smartLog('error', `Error handling gallery: ${error.message}`);

    // Send an internal server error response if an error occurs
    res.status(500).send('Internal Server Error');
  }
};

// Export the galleryHandler function for use in other modules
module.exports = { galleryHandler };
