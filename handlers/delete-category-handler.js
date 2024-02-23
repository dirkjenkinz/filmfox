'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, writeFile } = require('../services/file-service');

// Handler for deleting a category
const deleteCategoryHandler = async (req, res) => {
  // Log entry point for better traceability
  smartLog('info', 'ENTERING DELETE CATEGORY HANDLER');

  // Parse query parameters from the request URL
  const u = url.parse(req.url, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const category = u.query.category;

  try {
    // Fetch movie file information asynchronously
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    
    // Ensure breakdown property exists or initialize it as an empty array
    filmFoxFile.breakdown = filmFoxFile.breakdown || [];

    // Filter out the specified category from each breakdown entry
    filmFoxFile.breakdown = filmFoxFile.breakdown.map(categories => {
      return categories.filter(categoryItem => categoryItem[0] !== category);
    });

    // Write the updated file content back to the file
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

    // Redirect to the categories page with updated query parameters
    res.redirect(`/categories?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`);
  } catch (error) {
    // Log any errors that occur during file handling
    smartLog('error', `Error handling category deletion: ${error.message}`);

    // Send an internal server error response if an error occurs
    res.status(500).send('Internal Server Error');
  }
};

// Export the deleteCategoryHandler function for use in other modules
module.exports = { deleteCategoryHandler };
