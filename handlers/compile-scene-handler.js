'use strict';

const url = require('url');
const { getFile, getFileList, writeFile } = require('../services/file-service');
const dotenv = require('dotenv');
dotenv.config();
const { smartLog } = require('../services/smart-log');

/**
 * Handles the compilation of a specific scene.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
const compileSceneHandler = async (req, res) => {
  try {
    // Log the entry of the compile scene handler
    smartLog('info', 'ENTERING COMPILE SCENE HANDLER');

    // Parse the URL parameters
    let u = url.parse(req.originalUrl, true);
    const title = u.query.title;
    const sceneNumber = u.query.sceneNumber;

    // Retrieve filmFoxFile, script, and characterList
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    const { script, characterList } = filmFoxFile;
    const scene = script[sceneNumber];

    // Retrieve sound files for the specified scene
    const soundFiles = await getFileList(`data/${title}/sound/sounds`, 'mp3');
    const queue = [];

    // Iterate through each element in the scene
    scene.forEach((element, index) => {
      let sc = `0000${sceneNumber}`.slice(-4);
      let el = `0000${index}`.slice(-4);
      const fileName = `${sc}_${el}.mp3`;
      let found = 'no';

      // Check if the sound file exists in the specified scene
      soundFiles.forEach((s) => {
        if (s === fileName) {
          found = 'yes';
        }
      });

      // If sound file not found, add to the processing queue
      if (found === 'no') {
        let voice = '';
        characterList.forEach((c) => {
          if (c[0] == element.character) voice = c[1];
        });
        queue.push([sceneNumber, index, element.character, voice]);
      }
    });

    // Update the filmFoxFile with the processing queue
    filmFoxFile.queue = queue;
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

    // Redirect to the process queue page
    res.redirect(`/process-queue?title=${title}`);
  } catch (error) {
    // Log any errors and send a 500 Internal Server Error response
    smartLog('error', `Error in compileSceneHandler: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { compileSceneHandler };
