
const url = require('url');
const { getData, writeFile } = require('../services/file-service');
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
  smartLog('info', 'entering character update handler');

  const u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
  let voice = u.query.voice;
  let character = u.query.character;
  let file = u.query.filmFoxFile;
  let fff = await getData(file + '.fff');
  const { title } = fff;
  const characters = await getData(file + '.chrs');

  const voices = await getData('voices.json');
  voice_data = getVoiceData(voices);
  voice_data.unshift(['-', '', '']);

  characters.forEach(c => {
    if (c[0] === character) {
      c[1] = voice;
    }
  })

  writeFile(JSON.stringify(fff), title + '.fff');
  writeFile(JSON.stringify(characters), title + '.chrs');

  res.render('character-to-voice.njk', {
    title,
    characters,
    voice_data,
    ptr,
  });
};

module.exports = { characterUpdateHandler };