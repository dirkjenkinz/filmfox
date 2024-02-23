'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { deleteFile } = require('../services/file-service');

// Handler for deleting an image
const deleteImageHandler = async (req, res) => {
  // Log entry point for better traceability
  smartLog('info', 'ENTERING DELETE IMAGE HANDLER');

  // Parse query parameters from the request URL
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const image = u.query.image;
  const scr1 = u.query.scr1;

  try {
    // Delete the specified image associated with the given title
    await deleteFile(title, 'vision/images', image);

    // Redirect to the show gallery page with updated query parameters
    res.redirect(`/show-gallery?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}&scr1=${scr1}`);
  } catch (error) {
    // Log any errors that occur during image deletion
    smartLog('error', `Error deleting image: ${error.message}`);

    // Send an internal server error response if an error occurs
    res.status(500).send('Internal Server Error');
  }
};

// Export the deleteImageHandler function for use in other modules
module.exports = { deleteImageHandler };
