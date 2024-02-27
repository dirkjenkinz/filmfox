'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile } = require('../../services/file-service');

const sceneArrangerHandler = async (req, res) => {
  smartLog('info', 'ENTERING SCENE ARRANGER HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const elementNumber = u.query.elementNumber;
  const sceneNumber = u.query.sceneNumber;

  // Destructure relevant properties from filmFoxFile
  const { shotList, script, sceneOrder } = await getFile(`${title}/${title}.fff`);

  // Use default parameters for phase and scr1
  let { phase = 'select', scr1 = 0 } = u.query;

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

  res.render('scene-arranger.njk', {
    title,
    shotList: sList,
    slugList,
    page: 'Scene Arranger',
    caller: 'scene-arranger',
    elementNumber,
    sceneNumber,
    phase,
    scr1,
    size: shotList.length,
    sceneOrder,
  });
};

module.exports = { sceneArrangerHandler };
