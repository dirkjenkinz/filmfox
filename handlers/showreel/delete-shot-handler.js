'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile, writeFile } = require('../../services/file-service');

// Handler for deleting a shot from the shot list
const deleteShotHandler = async (req, res) => {
  // Log entry point for better traceability
  smartLog('info', 'ENTERING DELETE SHOT HANDLER');

  // Parse query parameters from the request URL
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const line = u.query.line;

  try {
    // Fetch movie file information asynchronously
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    const { shotList } = filmFoxFile;
    
    // Retrieve the shot array for the specified scene
    const shots = shotList[sceneNumber].lines;

    // Check if there is more than one shot before attempting deletion
    if (shots.length > 1) {
      // Remove the specified shot line
      shots.splice(line, 1);

      // Write the updated file content back to the file
      await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
    }

    // Redirect to the scene shot list page with updated query parameters
    res.redirect(`/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
  } catch (error) {
    // Log any errors that occur during shot deletion
    smartLog('error', `Error deleting shot: ${error.message}`);

    // Send an internal server error response if an error occurs
    res.status(500).send('Internal Server Error');
  }
};

// Export the deleteShotHandler function for use in other modules
module.exports = { deleteShotHandler };
