'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, getFileList } = require('../services/file-service');

// Handler for rendering sheets page
const sheetsHandler = async (req, res) => {
  smartLog('info', 'ENTERING SHEETS HANDLER');

  // Parse URL parameters
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  let sheet = u.query.sheet;
  const elementNumber = u.query.elementNumber;
  const sceneNumber = u.query.sceneNumber;

  // Get file data
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { shotList, script, sceneOrder, credits, charactersByScene, breakdown } = filmFoxFile;

  // Default to current scene if sheet is not provided
  if (!sheet) sheet = sceneNumber;

  // Generate slugs from script data
  const slugs = [];
  script.forEach((s) => {
    slugs.push(s[0].dialogue);
  });

  // Prepare shot list and slug list for rendering
  const sList = [];
  const slugList = [];
  sceneOrder.forEach((scene, index) => {
    sList.push(shotList[scene]);
    slugList.push(slugs[scene]);
  });

  // Extract slugs marked as 'yes' from script
  script.forEach((s) => {
    if (s.slug === 'yes') {
      slugs.push(s.dialogue);
    }
  });

  // Render sheets page with necessary data
  res.render('sheets.njk', {
    title,
    shotList: sList,
    slugs: slugList,
    page: 'Sheets',
    caller: 'sheets',
    size: shotList.length - 1,
    sheet: sheet,
    realTitle: credits.title,
    characterList: charactersByScene[sheet],
    sceneNumber,
    elementNumber,
  });
};

module.exports = { sheetsHandler };
