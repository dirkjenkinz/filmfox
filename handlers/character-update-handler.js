
const url = require('url');
const { getData, writeFile } = require('../services/file-service');
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

const characterUpdateHandler = async (req, res) => {
  logger.log('info', 'entering character update handler');

  const u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
  let voice = u.query.voice;
  let character = u.query.character;
  let file = u.query.filmFoxFile;
  let fff = await getData(file + '.fff');

  const { title, characters } = fff;

  voice_data = getVoiceData(voices);
  voice_data.unshift(['-','','']);

  characters.forEach(c => {
    if (c[0] === character) {
      c[1] = voice;
    }
  })

  writeFile(JSON.stringify(fff), title + '.fff');

  res.render('character-to-voice.njk', {
    title,
    characters,
    voice_data,
    ptr,
  });
};

module.exports = { characterUpdateHandler };