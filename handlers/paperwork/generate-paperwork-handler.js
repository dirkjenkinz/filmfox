'use strict';
const path = require('path');
const url = require('url');
const { smartLog } = require('../../services/smart-log');

// Handler function for categories
const generatePaperworkHandler = async (req, res) => {
  // Log entering the categories handler
  smartLog('info', 'ENTERING GENERATE PAPERWORK HANDLER');

  // Parse the URL to extract query parameters
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  let categoryDirectory = path.join(__dirname, `../../data/${title}/paperwork/breakdown`);

  // Render the categories template with necessary data
  res.render('paperwork/generate-paperwork.njk', {
    title,
    page: 'Generate Paperwork',
    caller: 'generate-paperwork',
    categoryDirectory: `.../${title}/paperwork/breakdown`,
    sheetDirectory: `.../${title}/paperwork/sheets`,
    shotDirectory: `.../${title}/paperwork/shots`,
    powerpointDirectory: `.../${title}/paperwork/ppt`,
  });
};

// Export the handler function
module.exports = { generatePaperworkHandler };
