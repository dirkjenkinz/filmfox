'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, writeFile } = require('../services/file-service');

const deleteShotHandler = async (req, res) => {
  smartLog('info', 'ENTERING DELETE SHOT HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const line = u.query.line;

  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { shotList } = filmFoxFile;

  const shot = shotList[sceneNumber].lines;
  const newLine = {
    shot: '-',
    angle: '-',
    move: '-',
    audio: '-',
    subject: '',
    description: '',
  };

  if (shot.length > 1) {
    shot.splice(line, 1);
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  }

  res.redirect(`/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
};

module.exports = { deleteShotHandler };
