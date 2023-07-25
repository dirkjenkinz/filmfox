const url = require('url');
const { getData, writeFile, getDuration } = require('../services/file-service');
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

  script.forEach(scriptChar => {
    characters.forEach(c => {
      if (c[0] === scriptChar[0]) {
        scriptChar[3] = c[1];
      };
    })
  });

  ptr = parseInt(ptr);
  const end = script.length - 10;
  if (ptr > end) ptr = end;
  if (ptr < 0) ptr = 0;

  const elements = await getListOfElements(title);
  elements.forEach((e, index) => {
    e = e.substring(6);
    e = e.substring(0, 6);
    elements[index] = parseInt(e);
  });

  script.forEach((s) => {
    s.push('');
  });

  const elementNames = await getListOfElements(title);
  elements.forEach((num) => {
    script[num][4] = elementNames[num];
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

  await writeFile(srt, `${title}.srt`);

  res.render('character-to-voice.njk', {
    title,
    characters,
    voice_data,
    ptr,
    end,
  });
};

module.exports = { characterToVoiceHandler };