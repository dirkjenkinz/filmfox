'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile, writeFile } = require('../../services/file-service');

/**
 * Handles the addition of a character to a specific scene.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addCharacterToSceneHandler = async (req, res) => {
  try {
    // Logging entering the handler
    smartLog('info', 'ENTERING ADD CHARACTER TO SCENE HANDLER');

    // Parsing URL parameters
    const u = url.parse(req.originalUrl, true);
    const title = u.query.title;
    const character = u.query.character;
    const sceneNumber = u.query.sceneNumber;
    const elementNumber = u.query.elementNumber;
    
    // Retrieving filmFoxFile data
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    let { charactersByScene } = filmFoxFile;

    // Adding the new character to the specified scene
    charactersByScene[sceneNumber].push(character);

    // Writing the updated filmFoxFile back to the file
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

    // Redirecting to the showreel page with updated parameters
    res.redirect(`/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
  } catch (error) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error('Error in addCharacterToSceneHandler:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { addCharacterToSceneHandler };
