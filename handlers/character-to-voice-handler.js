"use strict";

const url = require('url');
const { readFile } = require('../services/file-service');
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

const characterToVoiceHandler = async (req, res) => {
  smartLog('info', 'entering character to voice handler');
  const u = url.parse(req.originalUrl, true);
  const sceneNumber = u.query.sceneNumber;
  const title = u.query.filmFoxFile;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { characterList } = filmFoxFile;
  const voices = await readFile('voices.json');
  let voice_data = getVoiceData(voices);
  voice_data.unshift(['-', '', '']);

  characterList.forEach((c)=>{
    voice_data.forEach((v)=>{
      if (c[1] === v[0])
      {
        c[2] = v[2]
      }
    });
  });

  console.log({characterList});

    res.render('character-to-voice.njk', {
    title,
    characters: characterList,
    voice_data,
    sceneNumber,
    page: 'Voice Map',
  });
};

module.exports = { characterToVoiceHandler };