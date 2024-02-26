'use strict';
const url = require('url');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-creator-node');

// Importing necessary services
const { getFile } = require('../../services/file-service');
const { smartLog } = require('../../services/smart-log');

/**
 * Generates a PDF document for a scene's breakdown sheet.
 * @param {Array} breakdown - Breakdown data for the scene.
 * @param {Array} script - Script data for the scene.
 * @param {string} title - Title of the film.
 * @param {number} sceneNumber - Scene number.
 * @param {Object} shotList - Shot list for the scene.
 */
const sheetPDF = async (breakdown, script, title, sceneNumber, shotList) => {
  const pdfOptions = {
    format: 'A4',
    orientation: 'portrait',
    border: '5mm',
    header: {
      height: '5mm',
    },
    footer: {
      height: '40mm',
      contents: {
        default: '<span style="color: #444;">{{page}}</span> of <span>{{pages}}</span>',
        last: 'Last Page',
      },
    },
  };

  // Generate a filename based on scene number
  let fileName = '0000' + sceneNumber;
  fileName = 'sheet' + fileName.substring(fileName.length - 4) + '.pdf';

  const htmlPath = path.join(__dirname, '../../pages/templates/sheet.html');
  const outPath = path.join(__dirname, `../../data/${title}/paperwork/sheets/${fileName}`);
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Format breakdown entities for PDF content
  const entities = breakdown.map((entity) =>
    entity.map((item, index) => (index === 0 ? `${item.toUpperCase()}:` : `${item}, `))
  );

  const document = {
    html: html,
    data: {
      title: title,
      sceneNumber: sceneNumber,
      slug: script[0].dialogue,
      note: shotList.note,
      entities: entities,
    },
    path: outPath,
    type: '',
    header: {
      height: '20mm', // Adjust the height as needed
      contents: '<img src="../../images/film_fox_logo.jpg" style="width: 100%;" />',
    },
  };

  try {
    // Generate the PDF document
    const result = await pdf.create(document, pdfOptions);
    smartLog('info', `Created Sheet PDF: ${result.filename}`);
  } catch (error) {
    smartLog('error', error);
  }
};

/**
 * Handles the generation of sheet PDFs for multiple scenes.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const generateSheetPDFsHandler = async (req, res) => {
  try {
    smartLog('info', 'Entering Generate Sheet PDFs Handler');

    // Function to delay execution using Promises
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Parsing the original URL to extract query parameters
    const parsedUrl = url.parse(req.originalUrl, true);
    const title = parsedUrl.query.title;
    const sceneNumber = parsedUrl.query.sceneNumber;
    const elementNumber = parsedUrl.query.elementNumber;

    // Fetching breakdown data from the file service
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    const { breakdown, script, credits, shotList } = filmFoxFile;

    // Iterate over scenes and generate paperwork
    for (let scene = 1; scene < breakdown.length; scene++) {
      // Introduce a delay of 2 seconds between paperwork generation
      await delay(1000);

      await sheetPDF(breakdown[scene], script[scene], credits.title, scene, shotList[scene]);
    }

    // Redirect to the original page with updated parameters
    const returnUrl = `/${caller}?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
    res.redirect(returnUrl);
  } catch (error) {
    // Handling errors and sending an appropriate response
    smartLog('error', 'Error generating sheet PDFs:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { generateSheetPDFsHandler };
