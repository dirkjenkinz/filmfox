'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { deleteFile, getFile, writeFile } = require('../../services/file-service');

// Handler for deleting a file (sound or other types)
const deleteHandler = async (req, res) => {
  // Log entry point for better traceability
  smartLog('info', 'ENTERING DELETE HANDLER');

  // Parse query parameters from the request URL
  const u = url.parse(req.originalUrl, true);
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const title = u.query.title;
  const mute = u.query.mute;
  const fileName = u.query.fileName;

  try {
    // Delete the specified file (e.g., sound) associated with the given title
    await deleteFile(title, 'sound/sounds', fileName);

    // Redirect to the showreel page with updated query parameters
    res.redirect(`/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&mute=${mute}`);
  } catch (error) {
    // Log any errors that occur during file deletion
    smartLog('error', `Error deleting file: ${error.message}`);

    // Send an internal server error response if an error occurs
    res.status(500).send('Internal Server Error');
  }
};

// Export the deleteHandler function for use in other modules
module.exports = { deleteHandler };
