const url = require('url');
const { getData, getListOfElements, getDuration, writeFile } = require('../services/file-service');
const { generateSpeech } = require('../services/elevenLabs');
const dotenv = require('dotenv');
dotenv.config();
const logger = require('../services/logger');

const formatTime = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  let h = date.toISOString();
  h = h.substring(11, h.length - 5);
  let micro = (seconds - Math.floor(seconds));
  micro = micro.toString().substring(2, 5);
  h = `${h},${micro}`
  return h;
};

const procureDuration = async (file, elementName) => {
  let duration = await getDuration(file, elementName);
  return duration;
};

const generateSingleHandler = async (req, res) => {
  logger.log('info', 'entering generate single handler');

  let u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
  let element = u.query.element;
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file + '.fff');
  const api_key = process.env.APIKEY;

  const { title, characters, script, voice_data } = filmFoxFile;

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
    if (text.substring(0, 9) === 'INT./EXT.') {
      text = 'INTERIOR / EXTERIOR' + text.substring(4);
    }
    else if (text.substring(0, 4) === 'INT.') {
      text = 'INTERIOR' + text.substring(4);
    } else if (text.substring(0, 4) === 'EXT.') {
      text = 'EXTERIOR' + text.substring(4);
    };
  };

  generateSpeech(api_key, voice_id, fileName, text);

  ptr = parseInt(ptr);
  const end = script.length - 10;
  if (ptr > end) ptr = end;
  if (ptr < 0) ptr = 0;

  const elements = await getListOfElements(title);
  elements.forEach((e, index) => {
    e = e.substring(6);
    e = e.substring(0,6);
    elements[index] = parseInt(e);
  });
  
  script.forEach((s) => {
    s.push('-');
    s.push('');
  });

  const elementNames = await getListOfElements(title);
  elements.forEach((num) => {
    script[num][4] = elementNames[4];
  });

  let timeStart = 0.000;
  let timeFinish = 0.000;
  
  for (const element of elementNames) {
    const duration = await procureDuration(file, element);
    let num = element.substring(6, 12);
    num = parseInt(num);

    timeFinish = timeStart + duration;
    timeFinish = Math.round(timeFinish * 1000) / 1000;

    let formattedStart = '00:00:00,000';
    if (timeStart !== 0) {
      formattedStart = formatTime(timeStart);
    };

    script[num].push(formattedStart);
    script[num].push(formatTime(duration));
    script[num].push(formatTime(timeFinish));

    timeStart = timeFinish + 0.5;
    timeStart = Math.round(timeStart * 1000) / 1000;
  };

  let srt = '';
  for (let s = 0; s < script.length; s++) {
    if (script[s][6]) {
      const text = script[s][1].trim();
      srt += `${s + 1}.\n`;
      srt += `${script[s][6]} ---> ${script[s][8]}\n`;
      srt += `${script[s][0]}: ${text}\n\n`;
    };
  };

  const response = await writeFile(srt, `${title}.srt`);

  res.render('display.njk', {
    title,
    api_key,
    script,
    ptr,
    end,
  });
};

module.exports = { generateSingleHandler };