'use strict';
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, getFileList } = require('../services/file-service');

const sheetsHandler = async (req, res) => {
  smartLog('info', 'ENTERING SHEETS HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  let sheet = u.query.sheet;
  const elementNumber = u.query.elementNumber;
  const sceneNumber = u.query.sceneNumber;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { shotList, script, sceneOrder, credits, charactersByScene } = filmFoxFile;

  if (!sheet) sheet = sceneNumber;

  const slugs = [];
  script.forEach((s) => {
    slugs.push(s[0].dialogue);
  });

  const sList = [];
  const slugList = [];
  sceneOrder.forEach((scene, index) => {
    sList.push(shotList[scene]);
    slugList.push(slugs[scene]);
  });

  script.forEach((s) => {
    if (s.slug === 'yes') {
      slugs.push(s.dialogue);
    }
  });

  const sheetsList = await getFileList(`data/${title}/sheets/`, 'pdf');

  const sheetNos = [];

  sheetsList.forEach((s) => {
    let comp = s.substring(5);
    comp = parseInt(comp.substring(0, 4));
    sheetNos.push(comp);
  });

  let exists = 'no';
  if (sheetNos.indexOf(parseInt(sheet)) !== -1) {
    exists = 'yes';
  }

  res.render('sheets.njk', {
    title,
    shotList: sList,
    slugs: slugList,
    page: 'Sheets',
    size: shotList.length - 1,
    sheet: sheet,
    realTitle: credits.title,
    exists,
    characterList: charactersByScene[sheet],
    sceneNumber,
    elementNumber,
  });
};

module.exports = { sheetsHandler };
