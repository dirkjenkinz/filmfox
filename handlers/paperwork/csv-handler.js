'use strict';

// Importing necessary service
const { writeFile } = require('../../services/file-service');

/**
 * Generates and writes Master List CSV file based on breakdown data.
 * @param {Array} breakdown - Breakdown data.
 * @param {string} title - Title of the film.
 */
const masterListCSV = async (breakdown, title) => {
  let csv = `${title}\nScene,`;

  // Adding header row
  breakdown[0].forEach((line) => {
    csv += `${line},`;
  });

  csv += '\n';

  // Adding scene-wise breakdown
  breakdown.forEach((lines, linesIndex) => {
    csv += `${linesIndex},`;

    lines.forEach((line) => {
      line.forEach((item, index) => {
        if (index > 0) {
          csv += `${item} - `;
        };
      });
      csv += ',';
    });

    csv += '\n';
  });

  // Writing CSV file
  await writeFile(csv, `${title}/paperwork/breakdown/MasterList.csv`);
};

/**
 * Generates and writes Category-specific CSV files based on breakdown data.
 * @param {Array} breakdown - Breakdown data.
 * @param {string} title - Title of the film.
 */
const categoryCSV = async (breakdown, title) => {
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

/**
 * Generates and writes Shot List CSV file based on shot list data.
 * @param {Object} shotList - Shot list data.
 * @param {string} title - Title of the film.
 * @param {number} sceneNumber - Scene number.
 * @param {string} slug - Slug for the scene.
 */
const shotListCSV = async (shotList, title, sceneNumber, slug) => {
  let csv = `${title}, Scene ${sceneNumber}, ${slug},Day ,,,,,\n\n`;
  csv += 'SHOT,ANGLE,MOVE,AUDIO,SUBJECT,DESCRIPTION,DONE\n';

  // Adding shot-wise details
  shotList.lines.forEach((shot) => {
    csv += `${shot.shot}, ${shot.angle}, ${shot.move}, ${shot.audio}, ${shot.subject}, ${shot.description}\n`;
  });

  // Creating a unique file name based on scene number
  let fileNumber = '0000' + sceneNumber;
  fileNumber = fileNumber.substring(fileNumber.length - 4);
  const fileName = 'shots' + fileNumber;

  // Writing CSV file
  await writeFile(csv, `${title}/paperwork/shots/${fileName}.csv`);
};

/**
 * Generates and writes Sheet CSV file based on breakdown, script, and shot list data.
 * @param {Array} breakdown - Breakdown data.
 * @param {Array} script - Script data.
 * @param {string} title - Title of the film.
 * @param {number} sceneNumber - Scene number.
 * @param {Object} shotList - Shot list data.
 */
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

  // Writing CSV file
  await writeFile(csv, `${title}/paperwork/sheets/${fileName}.csv`);
};

module.exports = { masterListCSV, categoryCSV, shotListCSV, sheetCSV };
