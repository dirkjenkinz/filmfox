const url = require('url');
const { getData } = require('../services/file-service');
const { voices } = require('../data/voices.json');
const logger = require('../services/logger');

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
  logger.log('info', 'entering character to voice handler');
  const u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file + '.fff');

  const { characters, title, script } = filmFoxFile;

  voice_data = getVoiceData(voices);
  voice_data.unshift(['-','','']);

  const end = script.length - 10;

  res.render('character-to-voice.njk', {
    title,
    characters,
    voice_data,
    ptr,
    end,
  });
};

module.exports = { characterToVoiceHandler };