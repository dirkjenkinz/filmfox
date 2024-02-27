'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile } = require('../../services/file-service');

const renderBreakdownHandler = async (req, res) => {
  smartLog('info', 'ENTERING RENDER BREAKDOWN HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  let { script } = filmFoxFile;
  let breakdownData = [];
  
  // Extract relevant breakdown data from the script for the specified scene
  script[sceneNumber].forEach((s) => {
    breakdownData.push([s.character, s.dialogue]);
  });

  res.render('breakdown.njk', {
    doc: breakdownData,
    title,
    sceneNumber,
    elementNumber,
    page: 'breakdown',
    caller: 'breakdown',
  });
};

module.exports = { renderBreakdownHandler };
