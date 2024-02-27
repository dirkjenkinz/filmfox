'use strict';

const xlsx = require('xlsx');
const path = require('path');
const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile } = require('../../services/file-service');

// Function to delay execution using Promises
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const createXLS = (csvData, fileName) => {
  // Convert CSV to array of arrays
  const rows = csvData.trim().split('\n').map(line => line.split(','));

  // Create a new workbook
  const workbook = xlsx.utils.book_new();

  // Add a worksheet
  const worksheet = xlsx.utils.aoa_to_sheet(rows);
  // Add the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Write the workbook to an XLSX file
  const outPath = path.join(__dirname, `../../data/Satellite/paperwork/sheets/${fileName}.xlsx`);
  xlsx.writeFile(workbook, outPath, { bookType: 'xlsx', bookSST: false, type: 'binary' });

  smartLog('info', `${fileName}.xlsx created successfully`);
};

const sheetCSV = async (breakdown, script, title, sceneNumber, shotList) => {
  const note = shotList.note.replace(/,/gi, '');
  let csv = `${title}, Scene ${sceneNumber}, ${script[0].dialogue},Day ,,,,,\n`;
  csv += ',,,,,,,,\n';
  csv += 'DESCRIPTION,';

  // Adding header row for entities
  breakdown.forEach((entity) => {
    csv += `${entity[0]},`;
  });

  csv += '\n';

  // Adding data rows
  csv += `${note},`;

  breakdown.forEach((entity) => {
    let text = '';
    entity.forEach((ent, index) => {
      if (index > 0) {
        text += `${ent} - `;
      };
    });
    csv += `${text},`;
  });

  csv += '\n';

  // Creating a unique file name based on scene number
  let fileNumber = '0000' + sceneNumber;
  fileNumber = fileNumber.substring(fileNumber.length - 4);
  const fileName = 'sheet' + fileNumber;

  await createXLS(csv, fileName);
};

const generateSheetSpreadsheetsHandler = async (req, res) => {
  try {
    // Log entry information
    smartLog('info', 'ENTERING GENERATE SHEET SPREADSHEETS HANDLER');

    // Parse query parameters from the request URL
    const u = url.parse(req.originalUrl, true);
    const title = u.query.title;
    const caller = u.query.caller;
    const sceneNumber = u.query.sceneNumber;
    const elementNumber = u.query.elementNumber;

    // Retrieve filmFoxFile data
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    const { shotList, script, credits, breakdown } = filmFoxFile;

    const masterbook = xlsx.utils.book_new();

    // Iterate over scenes and generate paperwork
    for (let scene = 1; scene < breakdown.length; scene++) {
      // Introduce a delay between paperwork generation
      await delay(100);
      sheetCSV(breakdown[scene], script[scene], credits.title, scene, shotList[scene]);
    }

    // Redirect to the original page with updated parameters
    const returnUrl = `/generate-paperwork?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
    res.redirect(returnUrl);
  } catch (error) {
    // Log and handle errors
    smartLog('error',`Error in generateSheetSpreadsheetsHandler: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { generateSheetSpreadsheetsHandler };
