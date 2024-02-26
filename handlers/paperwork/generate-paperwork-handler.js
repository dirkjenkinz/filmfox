'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');

// Handler function for categories
const generatePaperworkHandler = async (req, res) => {
  // Log entering the categories handler
  smartLog('info', 'ENTERING GENERATE PAPERWORK HANDLER');

  // Parse the URL to extract query parameters
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;

  // Render the categories template with necessary data
  res.render('generate-paperwork.njk', {
    title,
    page: 'Generate Paperwork',
    caller: 'generate-paperwork',
  });
};

// Export the handler function
module.exports = { generatePaperworkHandler };
