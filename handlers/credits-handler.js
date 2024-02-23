'use strict';

// Import necessary modules
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile } = require('../services/file-service');

// Define the creditsHandler function to handle requests related to movie credits
const creditsHandler = async (req, res) => {
  // Log entry point for better traceability
  smartLog('info', 'ENTERING CREDITS HANDLER');

  try {
    // Parse query parameters from the request URL
    const u = url.parse(req.url, true);
    const title = u.query.title;
    const sceneNumber = u.query.sceneNumber;
    const elementNumber = u.query.elementNumber;

    // Fetch movie file information asynchronously
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    
    // Destructure the credits object with default values
    const { credits = { title, director: '', writer: '', producer: '' } } = filmFoxFile;

    // Render the 'credits' template with relevant data
    res.render('credits.njk', {
      title,
      credits,
      page: 'Credits',
      caller: 'credits',
      sceneNumber,
      elementNumber,
    });
  } catch (error) {
    // Log any errors that occur during file fetching
    smartLog('error', `Error fetching file: ${error.message}`);

    // Send an internal server error response if an error occurs
    res.status(500).send('Internal Server Error');
  }
};

// Export the creditsHandler function for use in other modules
module.exports = { creditsHandler };
