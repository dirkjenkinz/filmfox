'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile, writeFile } = require('../../services/file-service');

/**
 * Handles the addition of a character to the non-speakers list.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addCharacterHandler = async (req, res) => {
  try {
    // Logging entering the handler
    smartLog('info', 'ENTERING ADD CHARACTER HANDLER');

    // Parsing URL parameters
    const u = url.parse(req.originalUrl, true);
    const title = u.query.title;
    const character = u.query.character;
    const sceneNumber = u.query.sceneNumber;
    const elementNumber = u.query.elementNumber;

    // Retrieving filmFoxFile data
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    let { nonSpeakers } = filmFoxFile;

    // Adding the new character to the non-speakers list
    nonSpeakers.push(character);

    // Writing the updated filmFoxFile back to the file
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

    // Redirecting to the characters page with updated parameters
    res.redirect(`/characters?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`);
  } catch (error) {
    // Handling errors and sending a 500 Internal Server Error response
    smartLog('error', `Error in addCharacterHandler: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { addCharacterHandler };
