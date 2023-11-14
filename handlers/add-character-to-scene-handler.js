'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { readFile, writeFile } = require('../services/file-service');

const addCharacterToSceneHandler = async (req, res) => {
  smartLog('info', 'ENTERING ADD CHARACTER TO SCENE HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const character = u.query.character;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { charactersByScene } = filmFoxFile;
  charactersByScene[sceneNumber].push(character);
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  res.redirect(`/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
};

module.exports = { addCharacterToSceneHandler };
