'use strict';
const url = require('url');
const xlsx = require('xlsx');
const path = require('path');

// Importing necessary services
const { getFile } = require('../../services/file-service');
const { smartLog } = require('../../services/smart-log');

/**
 * Creates an XLSX file from CSV data for a specific category.
 * @param {string} csvData - CSV data for the category.
 * @param {string} category - Category name.
 */
const createXLS = (csvData, category, title) => {
  // Convert CSV to array of arrays
  const rows = csvData.trim().split('\n').map(line => line.split(','));

  // Create a new workbook
  const workbook = xlsx.utils.book_new();

  // Add a worksheet
  const worksheet = xlsx.utils.aoa_to_sheet(rows);

  // Add the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Write the workbook to an XLSX file
  const outPath = path.join(__dirname, `../../data/${title}/paperwork/breakdown/${category}.xlsx`);
  xlsx.writeFile(workbook, outPath, { bookType: 'xlsx', bookSST: false, type: 'binary' });

  smartLog('info', `${category}.xlsx created successfully`);
};

/**
 * Generates and writes category-specific XLSX files based on breakdown data.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const generateCategorySpreadsheetsHandler = async (req, res) => {
  try {
    smartLog('info', 'Entering Generate Category SpreadSheets Handler');

    // Parsing the original URL to extract query parameters
    const parsedUrl = url.parse(req.originalUrl, true);
    const title = parsedUrl.query.title;
    const sceneNumber = parsedUrl.query.sceneNumber;
    const elementNumber = parsedUrl.query.elementNumber;

    // Fetching breakdown data from the file service
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    const { breakdown } = filmFoxFile;

    // Initializing an array to store category data
    const categories = [];

    // Extracting category names from the first line of the breakdown
    breakdown[0].forEach((line) => {
      const cat = line[0].replace(/ /g, '_');
      categories.push([cat]);
    });

    // Organizing data into categories
    breakdown.forEach((lines) => {
      lines.forEach((line, index) => {
        categories[index].push(line);
      });
    });

    // Writing XLSX files for each category
    for (const category of categories) {
      let csv = `${title}, ${category[0]}\n\n`;

      for (let index = 1; index < category.length; index++) {
        csv += `SCENE ${index},`;

        for (let itemIndex = 1; itemIndex < category[index].length; itemIndex++) {
          csv += `${category[index][itemIndex]},`;
        }

        csv += '\n';
      }
      await createXLS(csv, category[0], title);
    }

    // Redirecting to the specified URL after XLSX generation
    const returnUrl = `/generate-paperwork?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
    res.redirect(returnUrl);

  } catch (error) {
    // Handling errors and sending an appropriate response
    console.error('Error generating category-specific XLSX files:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { generateCategorySpreadsheetsHandler };
