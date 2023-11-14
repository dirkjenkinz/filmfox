'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { readFile, writeFile } = require('../services/file-service');

const addCharacterHandler = async (req, res) => {
  smartLog('info', 'ENTERING ADD CHARACTER HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const character = u.query.character;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { nonSpeakers } = filmFoxFile;
  nonSpeakers.push(character);

  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  res.redirect(`/characters?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`);
};

module.exports = { addCharacterHandler };
