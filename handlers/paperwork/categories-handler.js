'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile } = require('../../services/file-service');

// Handler function for categories
const categoriesHandler = async (req, res) => {
  // Log entering the categories handler
  smartLog('info', 'ENTERING CATEGORIES HANDLER');

  // Parse the URL to extract query parameters
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;

  // Retrieve film file and necessary data
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  let category = u.query.category;
  let { breakdown } = filmFoxFile;

  // Initialize categories array
  const categories = [];

  // Populate categories array with default values
  breakdown[0].forEach((b) => {
    categories.push([b[0], 'n']);
  });

  // Create a list to store scenes and their associated categories
  const list = breakdown.reduce((acc, categories, index) => {
    const temp = [index];
    categories.forEach((c) => {
      if (c.length > 1) {
        temp.push(c);
      }
    });
    if (temp.length > 1) {
      acc.push(temp);
    }
    return acc;
  }, []);

  // Update categories array based on the scenes and their associated categories
  list.forEach((scene) => {
    scene.forEach((s) => {
      categories.forEach((c) => {
        if (c[0] === s[0]) {
          c[1] = 'y';
        }
      });
    });
  });

  // Create a display list based on the selected category
  const displayList = [];
  if (category) {
    list.forEach((scene) => {
      scene.forEach((s) => {
        if (category === s[0]) {
          displayList.push([scene[0], s]);
        }
      });
    });
  } else {
    category = '';
  }

  // Render the categories template with necessary data
  res.render('paperwork/categories.njk', {
    title,
    sceneNumber,
    elementNumber,
    categories,
    list,
    category,
    displayList,
    page: 'Categories',
    caller: 'categories',
  });
};

// Export the handler function
module.exports = { categoriesHandler };
