"use strict";

const url = require('url');
const { readFile, writeFile } = require('../services/file-service');
const { smartLog } = require('../services/smart-log');

const getVoiceData = (voices) => {
  let voice_data = [];

  voices.forEach(voice => {
    let v = [];
    v.push(voice.name);
    v.push(voice.description);
    v.push(voice.voice_id);
    voice_data.push(v);
  });

  return voice_data.sort();
};

const characterUpdateHandler = async (req, res) => {
  smartLog('info', 'ENTERING CHARACTER UPDATE HANDLER');

  const u = url.parse(req.originalUrl, true);
  let voice = u.query.voice;
  let character = u.query.character;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const title = u.query.title;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const characters = filmFoxFile.characterList;
  
  const voices = await readFile('voices.json');
  let voice_data = getVoiceData(voices);
  voice_data.unshift(['-', '', '']);

  characters.forEach(c => {
    if (c[0] === character) {
      c[1] = voice;
    }
  })

  writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  res.redirect(`/ctv?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);

};

module.exports = { characterUpdateHandler };