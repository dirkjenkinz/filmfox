'use strict';

// Import necessary modules
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, writeFile } = require('../services/file-service');

// Handler function for updating API key
const updateAPIKeyHandler = async (req, res) => {
  try {
    // Log information about entering the handler
    smartLog('info', 'ENTERING UPDATE API KEY HANDLER');

    // Parse the URL to extract query parameters
    const parsedUrl = url.parse(req.originalUrl, true);

    // Read control.json file to get current control data
    let control = await getFile('control.json');

    // Update the API key in the control data with the new key from the query parameters
    control.api_key = parsedUrl.query.key;

    // Write the updated control data back to control.json
    await writeFile(JSON.stringify(control), 'control.json');

    // Redirect to the front page after successful update
    res.redirect('/front');
  } catch (error) {
    // Log error information and send a 500 Internal Server Error response
    smartLog('error', 'Error in updateAPIKeyHandler:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Export the updateAPIKeyHandler function for external use
module.exports = { updateAPIKeyHandler };
