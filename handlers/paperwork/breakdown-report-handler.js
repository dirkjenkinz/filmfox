'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile } = require('../../services/file-service');

/**
 * Handles requests to generate a breakdown report.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const breakdownReportHandler = async (req, res) => {
  try {
    // Logging entering the handler
    smartLog('info', 'ENTERING BREAKDOWN REPORT HANDLER');

    // Parsing URL parameters
    const u = url.parse(req.originalUrl, true);
    let sceneNumber = u.query.sceneNumber || 0;
    let elementNumber = u.query.elementNumber || 0;
    const title = u.query.title;

    // Loading filmFoxFile data
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    let { script, breakdown } = filmFoxFile;

    // Defaulting sceneNumber and elementNumber if not provided
    if (!sceneNumber) sceneNumber = 0;
    if (!elementNumber) elementNumber = 0;

    // Rendering the 'breakdown-report' template with provided data
    res.render('paperwork/breakdown-report.njk', {
      title,
      sceneNumber,
      elementNumber,
      highestScene: script.length - 1,
      breakdown: breakdown[sceneNumber],
      scene: script[sceneNumber],
      page: 'Breakdown Report',
      caller: 'breakdown-report',
      size: script.length - 1,
    });
  } catch (error) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error('Error in breakdownReportHandler:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { breakdownReportHandler };
