const url = require('url');
const { getData, getListOfElements } = require('../services/file-service');
const { smartLog } = require('../services/smart-log');
const dotenv = require('dotenv');
dotenv.config();

const displayHandler = async (req, res) => {
  smartLog('info', 'ENTERING DISPLAY HANDLER');
  const u = url.parse(req.originalUrl, true);
  const locked = u.query.locked;
  let scene = parseInt(u.query.scene);
  const title = u.query.title;
  let element = u.query.element;
  let filmFoxFile = await getData(`${title}/${title}.fff`);
  
  let lock = 'Unlock';

  if (locked === 'no') {
    lock = 'Lock';
  };

  if (!element){
    element = 0;
  };

  if (!scene){
    scene = 0;
  }
  const nextScene = scene + 1;

  const { script, shotList } = filmFoxFile;
  const characters = await getData(`${title}/${title}.chrs`);
  const api_key = process.env.APIKEY;

  let slug = '';
  let highest = 0;

  script.forEach((s, index) => {
    if (s.scene === scene && s.slug === 'yes'){
      slug = s.dialogue;
    };
    if (s.slug === 'yes') {
      highest = s.scene;
    }
  });

  script.forEach((s) => {
    characters.forEach((c) => {
      if (c[0] === s.character) {
        s.voice = c[1];
      }
    });
  });

  const elements = await getListOfElements(title);
  elements.forEach((e, index) => {
    e = e.substring(6);
    e = e.substring(0, 6);
    elements[index] = parseInt(e);
  });

  let runningTime = 0.000;
  let time = [];
  script.forEach((s) => {
    if (s.duration !== ''){
      runningTime = runningTime + parseFloat(s.duration);
      time.push(runningTime.toFixed(3));
      }
  });

  const note = shotList[scene].note;

  res.render('display.njk', {
    title,
    api_key,
    script,
    lock,
    time,
    scene,
    nextScene,
    slug,
    highest,
    note,
  });
};

module.exports = { displayHandler };
