'use strict';

const url = require('url');
const path = require('path');
const { smartLog } = require('../../services/smart-log');
const { getFile } = require('../../services/file-service');
const videoStitch = require('video-stitch');
const videoConcat = videoStitch.concat;

/**
 * Concatenate video scenes and redirect to the video processing page.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
const concatenateVideoHandler = async (req, res) => {
  try {
    // Log the entry of the concatenate video handler
    smartLog('info', 'ENTERING CONCATENATE VIDEO HANDLER');

    // Parse URL parameters
    const u = url.parse(req.originalUrl, true);
    const title = u.query.title;

    // Retrieve filmFoxFile and script
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    const { script } = filmFoxFile;

    // Construct scenes and blank video paths
    const scenesPath = path.join(__dirname, `../data/${title}/vision/scenes`);
    const blankVideoPath = path.join(__dirname, '../blank.mp4');

    // Create a list of scenes for concatenation
    const scenesList = script.map((_, scene) => {
      const sceneNumber = String(scene).padStart(4, '0');
      return { 'fileName': path.join(scenesPath, `${sceneNumber}.mp4`) };
    });

    // Add blank videos to the list
    for (let i = 0; i < 3; i++) {
      scenesList.push({ 'fileName': blankVideoPath });
    }

    // Specify the output file path
    const outputFile = path.join(scenesPath, 'master.mp4');

    // Concatenate video scenes
    videoConcat({
      silent: true,
      overwrite: true
    })
      .clips(scenesList)
      .output(outputFile)
      .concat()
      .then((outputFile) => {
        smartLog('info', `${outputFile} - created`);
        // Redirect to the video processing page
        res.redirect(`/video?title=${title}&sceneNumber=0`);
      })
      .catch((error) => {
        // Log and handle errors during video concatenation
        smartLog('error', `Error during video concatenation: ${error.message}`);
        res.status(500).send('Internal Server Error');
      });
  } catch (error) {
    // Log and handle errors in the video concatenation handler
    smartLog('error', `Error in concatenateVideoHandler: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { concatenateVideoHandler };
