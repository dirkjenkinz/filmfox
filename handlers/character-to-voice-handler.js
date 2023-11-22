'use strict';

const url = require('url');
const { getFile } = require('../services/file-service');
const { smartLog } = require('../services/smart-log');

const getVoiceData = (voices) => {
  let voice_data = [];
  voices.forEach((voice) => {
    let v = [];
    v.push(voice.name);
    v.push(voice.description);
    v.push(voice.voice_id);
    v.push(voice.labels.description);
    v.push(voice.labels.gender);
    v.push(voice.labels.accent);
    v.push(voice.labels.age);
    voice_data.push(v);
  });
  return voice_data.sort();
};

const characterToVoiceHandler = async (req, res) => {
  smartLog('info', 'ENTERING CHARACTER TO VOICE HANDLER');
  const u = url.parse(req.originalUrl, true);
  let sceneNumber = u.query.sceneNumber;
  let elementNumber = u.query.elementNumber;
  let scr1 = u.query.scr1;
  const title = u.query.title;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { characterList } = filmFoxFile;
  const voices = await getFile('voices.json');
  let voice_data = getVoiceData(voices);
  voice_data.unshift(['-', '', '']);

  if (!sceneNumber ) sceneNumber = 0;
  if (!elementNumber) elementNumber = 0;

  characterList.forEach((c) => {
    voice_data.forEach((v) => {
      if (c[1] === v[0]) {
        c[2] = v[2];
      }
    });
  });

  if (!scr1) scr1 = 0;  

  res.render('character-to-voice.njk', {
    title,
    characters: characterList,
    voice_data,
    sceneNumber,
    elementNumber,
    page: 'Voice Map',
    scr1,
  });
};

module.exports = { characterToVoiceHandler };
