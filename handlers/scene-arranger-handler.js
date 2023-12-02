'use strict';
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile } = require('../services/file-service');

const sceneArrangerHandler = async (req, res) => {
  smartLog('info', 'ENTERING SCENE ARRANGER HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const elementNumber = u.query.elementNumber;
  const sceneNumber = u.query.sceneNumber;
  let phase = u.query.phase;
  let scr1 = u.query.scr1;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { shotList, script, sceneOrder } = filmFoxFile;

  if (!phase) phase = 'select';

  const slugs = [];
  script.forEach((s) => {
    slugs.push(s[0].dialogue);
  });

  const sList = [];
  const slugList = [];
  sceneOrder.forEach((sceneNumber) => {
    sList.push(shotList[sceneNumber]);
    slugList.push(slugs[sceneNumber]);
  });

  if (!scr1) scr1 = 0;

  res.render('scene-arranger.njk', {
    title,
    shotList: sList,
    slugList,
    page: 'Scene Arranger',
    elementNumber,
    sceneNumber,
    phase,
    scr1,
    size: shotList.length,
    sceneOrder,
  });
};

module.exports = { sceneArrangerHandler };
