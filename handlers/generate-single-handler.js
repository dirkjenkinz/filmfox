const url = require('url');
const { getData, writeFile, getDuration } = require('../services/file-service');
const { generateSpeech } = require('../services/elevenLabs');
const dotenv = require('dotenv');
dotenv.config();
const { smartLog } = require('../services/smart-log');

const generateSingleHandler = async (req, res) => {
  smartLog('info', 'ENTERING GENERATE SINGLE HANDLER');

  let u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
  let element = u.query.element;
  let title = u.query.title;
  let filmFoxFile = await getData(`${title}/${title}.fff`);
  const characters = await getData(`${title}/${title}.chrs`);
  const api_key = process.env.APIKEY;

  const { script, voice_data } = filmFoxFile;

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
  const fileName = `${title}/sounds/sound_${fileNum}_${script[element][0]}.mp3`;
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
  };

 
const msg =  await generateSpeech(api_key, voice_id, fileName, text);

if (msg !== 'Failed'){
  script[element][4] = `sound_${fileNum}_${script[element][0]}`;
  script[element][6] = await getDuration(title, `${script[element][4]}.mp3`);
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
}

  res.redirect(`/display?title=${title}&ptr=${ptr}`);
};

module.exports = { generateSingleHandler };