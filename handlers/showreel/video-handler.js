'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile, getFileList } = require('../../services/file-service');

/**
 * Handles requests related to video processing.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const videoHandler = async (req, res) => {
  smartLog('info', 'ENTERING VIDEO HANDLER');

  // Parse URL parameters
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  let elementNumber = u.query.elementNumber || 0;
  let sceneNumber = u.query.sceneNumber || 0;

  // Retrieve filmFoxFile and script from the file
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  // Get the list of videos and scenes
  const videoList = await getFileList(`data/${title}/vision/videos`, 'mp4');
  const scenesList = await getFileList(`data/${title}/vision/scenes`, 'mp4');

  // Check video completion status for each scene
  const completeArray = script.map((scene, sceneIndex) => {
    let complete = 'yes';
    scene.forEach((element, elementIndex) => {
      const sceneNumberFormatted = `0000${sceneIndex}`.slice(-4);
      const elementNumberFormatted = `0000${elementIndex}`.slice(-4);
      const item = `${sceneNumberFormatted}_${elementNumberFormatted}.mp4`;
      if (videoList.indexOf(item) === -1) {
        complete = 'no';
      }
    });
    return complete;
  });

  // Check if sound files are missing for each scene
  let soundFiles = await getFileList(`data/${title}/sound/sounds`, 'mp3');
  let fileNotFound = [];

  script.forEach((scene, i) => {
    scene.forEach((element, j) => {
      const sceneNumberFormatted = `0000${i}`.slice(-4);
      const elementNumberFormatted = `0000${j}`.slice(-4);
      const fileName = `${sceneNumberFormatted}_${elementNumberFormatted}.mp3`;
      if (!soundFiles.includes(fileName)) {
        fileNotFound.push(fileName.substring(0, 4));
      }
    });
  });

  fileNotFound = [...new Set(fileNotFound)];

  // Check if each scene video exists
  const exists = script.map((_, sceneIndex) => {
    const fileName = `0000${sceneIndex}.mp4`.slice(-8);
    return scenesList.includes(fileName) ? 'yes' : 'no';
  });

  // Determine overall readiness status
  const ready = exists.every((status) => status === 'yes') ? 'yes' : 'no';

  // Render the video template
  res.render('video.njk', {
    title,
    script,
    page: 'Video',
    caller: 'video',
    sceneNumber,
    elementNumber,
    completeArray,
    ready,
    exists,
  });
};

module.exports = { videoHandler };
