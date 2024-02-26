'use strict';
const url = require('url');

// Importing necessary service
const { writeFile, getFile } = require('../../services/file-service');

/**
 * Generates and writes Category-specific CSV files based on breakdown data.
 * @param {Array} breakdown - Breakdown data.
 * @param {string} title - Title of the film.
 */
const generateCategoryCSVsHandler = async (req, res) => {
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { breakdown } = filmFoxFile;

  const categories = [];

  // Extracting category names
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

  // Writing CSV files for each category
  categories.forEach(async (category) => {
    let csv = `${title}, ${category[0]}\n\n`;

    category.forEach((scene, index) => {
      if (index > 0) {
        csv += `SCENE ${index},`;

        scene.forEach((item, itemIndex) => {
          if (itemIndex > 0) {
            csv += `${item},`;
          };
        });

        csv += '\n';
      };
    });

    await writeFile(csv, `${title}/paperwork/breakdown/${category[0]}.csv`);
  });
};



module.exports = { generateCategoryCSVsHandler };
