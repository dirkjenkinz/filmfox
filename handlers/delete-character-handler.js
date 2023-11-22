'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, writeFile } = require('../services/file-service');

const deleteCharacterHandler = async (req, res) => {
  smartLog('info', 'ENTERING DELETE CHARACTER HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const character = u.query.character;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;

  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  let { nonSpeakers } = filmFoxFile;

  const ns = [];

  nonSpeakers.forEach((n) => {
    if (n !== character) {
      ns.push(n);
    };
  });

  filmFoxFile.nonSpeakers = ns;

  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  res.redirect(`/characters?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`);
};

module.exports = { deleteCharacterHandler };
