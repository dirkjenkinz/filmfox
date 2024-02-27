'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile, writeFile } = require('../../services/file-service');

// Handler for deleting a character from a scene
const deleteCharacterFromSceneHandler = async (req, res) => {
  // Log entry point for better traceability
  smartLog('info', 'ENTERING DELETE CHARACTER FROM SCENE HANDLER');

  // Parse query parameters from the request URL
  const u = url.parse(req.url, true);
  const title = u.query.title;
  const character = u.query.character;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;

  try {
    // Fetch movie file information asynchronously
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    
    // Ensure charactersByScene property exists and initialize it as an empty object if not
    filmFoxFile.charactersByScene = filmFoxFile.charactersByScene || {};

    // Ensure characters array for the specified scene exists
    filmFoxFile.charactersByScene[sceneNumber] = filmFoxFile.charactersByScene[sceneNumber] || [];

    // Find the index of the character in the characters array for the specified scene
    const pointer = filmFoxFile.charactersByScene[sceneNumber].indexOf(character);

    // Remove the character from the characters array for the specified scene
    filmFoxFile.charactersByScene[sceneNumber].splice(pointer, 1);

    // Write the updated file content back to the file
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

    // Redirect to the showreel page with updated query parameters
    res.redirect(`/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
  } catch (error) {
    // Log any errors that occur during file handling
    smartLog('error', `Error handling character deletion from scene: ${error.message}`);

    // Send an internal server error response if an error occurs
    res.status(500).send('Internal Server Error');
  }
};

// Export the deleteCharacterFromSceneHandler function for use in other modules
module.exports = { deleteCharacterFromSceneHandler };
