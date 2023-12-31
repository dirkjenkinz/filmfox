'use strict';
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile } = require('../services/file-service');

const fullShotListHandler = async (req, res) => {
  smartLog('info', 'ENTERING FULL SHOT LIST HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  let hidden = u.query.hidden;
  const elementNumber = u.query.elementNumber;
  const sceneNumber = u.query.sceneNumber;
  let top = u.query.top;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { shotList, script, sceneOrder, credits } = filmFoxFile;

  if (!top) top = 1;

  if (!hidden) {
    hidden = [];
    for (let i = 0; i < shotList.length; i++) {
      hidden.push('false');
    }
  } else {
    hidden = hidden.split(',');
  }

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

  top = parseInt(top);
  let finish = 16 + parseInt(top);
  if (finish > shotList.length - 1) finish = shotList.length;
  if (finish < top) finish = top;

  res.render('full-shot-list.njk', {
    title,
    shotList: sList,
    slugList,
    page: 'Full Shot List',
    size: shotList.length,
    realTitle: credits.title,
    elementNumber,
    sceneNumber,
  });
};

module.exports = { fullShotListHandler };
