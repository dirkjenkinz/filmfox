'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile, writeFile } = require('../../services/file-service');

// Handler for deleting a character
const deleteCharacterHandler = async (req, res) => {
  // Log entry point for better traceability
  smartLog('info', 'ENTERING DELETE CHARACTER HANDLER');

  // Parse query parameters from the request URL
  const u = url.parse(req.url, true);
  const title = u.query.title;
  const character = u.query.character;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;

  try {
    // Fetch movie file information asynchronously
    const filmFoxFile = await getFile(`${title}/${title}.fff`);

    // Ensure nonSpeakers property exists and initialize it as an empty array if not
    filmFoxFile.nonSpeakers = filmFoxFile.nonSpeakers || [];

    // Filter out the specified character from the nonSpeakers array
    const ns = filmFoxFile.nonSpeakers.filter((n) => n !== character);

    // Update the nonSpeakers property with the filtered array
    filmFoxFile.nonSpeakers = ns;

    // Write the updated file content back to the file
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

    // Redirect to the characters page with updated query parameters
    res.redirect(`/characters?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`);
  } catch (error) {
    // Log any errors that occur during file handling
    smartLog('error', `Error handling character deletion: ${error.message}`);

    // Send an internal server error response if an error occurs
    res.status(500).send('Internal Server Error');
  }
};

// Export the deleteCharacterHandler function for use in other modules
module.exports = { deleteCharacterHandler };
