'use strict';
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { readFile } = require('../services/file-service');

const sceneArrangerHandler = async (req, res) => {
  smartLog('info', 'ENTERING SCENE ARRANGER HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const elementNumber = u.query.elementNumber;
  const sceneNumber = u.query.sceneNumber;
  let scr1 = u.query.scr1;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { shotList, script, sceneOrder } = filmFoxFile;

  const slugs = [];
  script.forEach((s) => {
    slugs.push(s[0].dialogue);
  });

  const sList = [];
  const slugList = [];
  sceneOrder.forEach((sceneNumber, index) => {
    sList.push(shotList[sceneNumber]);
    slugList.push(slugs[sceneNumber]);
  });

  if (!scr1) scr1 = 0;  

  res.render('scene-arranger.njk', {
    title,
    shotList: sList,
    slugList,
    page: 'Scene Arranger',
    size: shotList.length,
    elementNumber,
    sceneNumber,
    scr1,
  });
};

module.exports = { sceneArrangerHandler };
