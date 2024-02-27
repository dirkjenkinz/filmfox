'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const {
  getFileList,
  getFile,
} = require('../../services/file-service');

/**
 * Extracts unique images used in the script.
 * @param {Array} script - The script containing scenes and images.
 * @returns {Array} - An array of unique images used in the script.
 */
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

/**
 * Handles the request to show the gallery.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Renders the show-gallery page.
 */
const showGalleryHandler = async (req, res) => {
  // Logging entry into the show gallery handler
  smartLog('info', 'ENTERING SHOW GALLERY HANDLER');

  // Parsing query parameters from the URL
  let u = url.parse(req.originalUrl, true);
  const sceneNumber = u.query.sceneNumber;
  const title = u.query.title;
  const elementNumber = u.query.elementNumber;
  const caller = u.query.caller;
  const mute = u.query.mute;
  let scr1 = u.query.scr1;
  if (!scr1) scr1 = 0;

  // Fetching the list of images in the specified directory
  const imageList = await getFileList(`data/${title}/vision/images`, '*');

  // Processing image list and categorizing them as 'movie' or 'still'
  const images = imageList.map((image) => {
    const extension = image.substring(image.length - 4);
    const type = ['.mov', '.mp4', '.avi', '.wmv', '.mkv'].includes(extension) ? 'movie' : 'still';
    return [image, type];
  });

  // Fetching script from the specified file
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;
  const usedImages = getUsed(script);

  // Adding metadata to each image in the list
  images.forEach((i) => {
    const isUsed = usedImages.includes(i[0]);
    i.push(isUsed ? 'yes' : 'no');
    const ptr = i[0].indexOf('.');
    i.push(i[0].substring(ptr));
  });

  // Rendering the show-gallery page
  res.render('show-gallery.njk', {
    title,
    elementNumber,
    sceneNumber,
    images,
    caller,
    page: 'Show Gallery',
    caller: 'show-gallery',
    mute,
    scr1,
  });
};

module.exports = { showGalleryHandler };
