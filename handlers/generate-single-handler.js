const url = require('url');
const { getData } = require('../services/file-service');
const { generateSpeech } = require('../services/elevenLabs');
const dotenv = require('dotenv');
dotenv.config();
const { smartLog } = require('../services/smart-log');

const generateSingleHandler = async (req, res) => {
  smartLog('info', 'entering generate single handler');

  let u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
  let element = u.query.element;
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file + '.fff');
  const characters = await getData(file + '.chrs');
  const api_key = process.env.APIKEY;

  const { title, script, voice_data } = filmFoxFile;

  script.forEach(scriptChar => {
    characters.forEach(c => {
      if (c[0] === scriptChar[0]) {
        scriptChar[3] = c[1];
      };
    })
  });

  const character_name = script[element][3];

  let voice_id = '';
  voice_data.forEach(v => {
    if (v[0] === character_name) {
      voice_id = v[2];
    };
  });

  let fileNum = `000000${element}`;
  fileNum = fileNum.substring(fileNum.length - 6);
  const fileName = `${title}/sound_${fileNum}_${script[element][0]}.mp3`;

  let text = script[element][1];

  if (script[element][0] === 'NARRATOR') {
    const t = text.toUpperCase();
    if (t.substring(0, 9) === 'INT./EXT.') {
      text = 'INTERIOR / EXTERIOR' + text.substring(4);
    }
    else if (t.substring(0, 4) === 'INT.') {
      text = 'INTERIOR' + text.substring(4);
    } else if (t.substring(0, 4) === 'EXT.') {
      text = 'EXTERIOR' + text.substring(4);
    };
    text = text.replace(/\.\.\./g, '');
    console.log({text});
  };

  await generateSpeech(api_key, voice_id, fileName, text);

  res.redirect(`/display?filmFoxFile=${file}.fff&ptr=${ptr}`);

};

module.exports = { generateSingleHandler };