'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { generateSample } = require('../../services/elevenLabs');

// Handler for generating voice samples
const getSamplesHandler = async (req, res) => {
  // Log entry point for better traceability
  smartLog('info', 'ENTERING GET SAMPLES HANDLER');

  // Parse query parameters from the request URL
  const u = url.parse(req.originalUrl, true);
  const voice_id = u.query.voice_id;
  const scr1 = u.query.scr1;

  try {
    // Generate a voice sample asynchronously using the ElevenLabs service
    const {api_key} = await getFile('control.json');
    generateSample(voice_id, api_key);

    // Redirect to the 'voices' page after a delay (e.g., 3000 milliseconds)
    setTimeout(() => {
      res.redirect(`/voices?scr1=${scr1}`);
    }, 3000);
  } catch (error) {
    // Log any errors that occur during the sample generation process
    smartLog('error', `Error generating voice sample: ${error.message}`);

    // Send an internal server error response if an error occurs
    res.status(500).send('Internal Server Error');
  }
};

// Export the getSamplesHandler function for use in other modules
module.exports = { getSamplesHandler };
