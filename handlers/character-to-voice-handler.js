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
  const scene = u.query.scene;
  const title = u.query.filmFoxFile;
  
  const filmFoxFile = await readFile(`${title}/${title}.fff`);

  const { script } = filmFoxFile;
  let characters = await readFile(`${title}/${title}.chrs`);

  const voices = await readFile('voices.json');

  voice_data = getVoiceData(voices);
  voice_data.unshift(['-', '', '']);

  characters.forEach((c)=>{
    voice_data.forEach((v)=>{
      if (c[1] === v[0])
      {
        c[2] = v[2]
      }
    });
  });

    res.render('character-to-voice.njk', {
    title,
    characters,
    voice_data,
    scene,
  });
};

module.exports = { characterToVoiceHandler };