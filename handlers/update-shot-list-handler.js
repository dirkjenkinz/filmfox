'use strict';
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, writeFile } = require('../services/file-service');

const updateShotListHandler = async (req, res) => {
  smartLog('info', 'ENTERING UPDATE SHOTLIST HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const val = u.query.val;
  const item = u.query.item;
  const line = u.query.line;

  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const {shotList} = filmFoxFile;
  shotList[sceneNumber].lines[line][`${item}`] = val;
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  res.redirect(`/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}`);
};

module.exports = { updateShotListHandler };
