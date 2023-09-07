const url = require('url');
const { getData } = require('../services/file-service');
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
  let ptr = u.query.ptr;
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(`${file}/${file}.fff`);

  const { title, script } = filmFoxFile;

  let characters = await getData(`${file}/${file}.chrs`);

  const voices = await getData('voices.json');
  voice_data = getVoiceData(voices);
  voice_data.unshift(['-', '', '']);

  script.forEach(scriptChar => {
    characters.forEach(c => {
      if (c[0] === scriptChar[0]) {
        scriptChar[3] = c[1];
      };
    })
  });

  res.render('character-to-voice.njk', {
    title,
    characters,
    voice_data,
    ptr,
  });
};

module.exports = { characterToVoiceHandler };