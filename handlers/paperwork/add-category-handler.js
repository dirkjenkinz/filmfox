'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile, writeFile } = require('../../services/file-service');

/**
 * Handles the addition of a category to the breakdown data.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addCategoryHandler = async (req, res) => {
  try {
    // Logging entering the handler
    smartLog('info', 'ENTERING ADD CATEGORY HANDLER');

    // Parsing URL parameters
    const u = url.parse(req.originalUrl, true);
    const title = u.query.title;
    const sceneNumber = u.query.sceneNumber;
    const elementNumber = u.query.elementNumber;
    const category = u.query.category;

    // Retrieving filmFoxFile data
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    let { breakdown } = filmFoxFile;

    // Adding the new category to each breakdown entry
    breakdown.forEach((b) => {
      b.push([category]);
    });

    // Writing the updated filmFoxFile back to the file
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

    // Redirecting to the categories page with updated parameters
    res.redirect(`/categories?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`);
  } catch (error) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error('Error in addCategoryHandler:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { addCategoryHandler };
