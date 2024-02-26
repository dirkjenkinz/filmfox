'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile } = require('../../services/file-service');
const {
  masterListCSV,
  categoryCSV,
  shotListCSV,
  sheetCSV
} = require('./csv-handler');
const {
  masterListPDF,
  categoryPDF,
  shotListPDF,
  sheetPDF
} = require('./pdf-handler');

// Function to delay execution using Promises
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Handler to generate paperwork
const generatePaperworkHandler = async (req, res) => {
  try {
    // Log entry information
    smartLog('info', 'ENTERING GENERATE PAPERWORK HANDLER');

    // Parse query parameters from the request URL
    const u = url.parse(req.originalUrl, true);
    const title = u.query.title;
    const caller = u.query.caller;
    const sceneNumber = u.query.sceneNumber;
    const elementNumber = u.query.elementNumber;

    // Retrieve filmFoxFile data
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    const { shotList, script, credits, breakdown } = filmFoxFile;

    // Iterate over scenes and generate paperwork
    for (let scene = 1; scene < breakdown.length; scene++) {
      // Introduce a delay of 2 seconds between paperwork generation
      await delay(2000);

      // Generate CSV and PDF for sheet and shotList
      sheetCSV(breakdown[scene], script[scene], credits.title, scene, shotList[scene]);
      sheetPDF(breakdown[scene], script[scene], credits.title, scene, shotList[scene]);
      shotListCSV(shotList[scene], credits.title, scene, script[scene][0].dialogue);
      shotListPDF(shotList[scene], credits.title, scene, script[scene][0].dialogue);
    }

    // Generate CSV and PDF for category and masterList
    categoryCSV(breakdown, title);
    categoryPDF(breakdown, title);
    masterListCSV(breakdown, title);
    masterListPDF(breakdown, title);

    // Redirect to the original page with updated parameters
    const returnUrl = `/${caller}?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
    res.redirect(returnUrl);
  } catch (error) {
    // Log and handle errors
    console.error('Error in generatePaperworkHandler:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { generatePaperworkHandler };
