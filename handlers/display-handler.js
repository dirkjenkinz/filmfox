const url = require('url');
const { getData, getListOfElements } = require('../services/file-service');
const { smartLog } = require('../services/smart-log');
const dotenv = require('dotenv');
dotenv.config();

const displayHandler = async (req, res) => {
  smartLog('info', 'ENTERING DISPLAY HANDLER');
  const u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  const locked = u.query.locked;
  const title = u.query.title;
  const headersOnly = u.query.headersOnly;
  let filmFoxFile = await getData(`${title}/${title}.fff`);
  let lock = 'Unlock';
  if (locked === 'no') {
    lock = 'Lock';
  }

  const { script } = filmFoxFile;
  const characters = await getData(`${title}/${title}.chrs`);
  const api_key = process.env.APIKEY;

  script.forEach((scriptChar) => {
    characters.forEach((c) => {
      if (c[0] === scriptChar[0]) {
        scriptChar[3] = c[1];
      }
    });
  });

  const elements = await getListOfElements(title);
  elements.forEach((e, index) => {
    e = e.substring(6);
    e = e.substring(0, 6);
    elements[index] = parseInt(e);
  });

  let imageType = [];
  let images = [];
  for (let i = 0; i < script.length; i++) {
    if (script[i][5].substring(script[i][5].length - 4) === '.mov') {
      imageType.push('movie');
      images.push([script[i][5], 'movie']);
    } else if (script[i][5].substring(script[i][5].length - 4) === '.mp4') {
      imageType.push('movie');
      images.push([script[i][5], 'movie']);
    } else {
      imageType.push('still');
      images.push([script[i][5], 'still']);
    }
  }

  let scenePtr = -1;
  let headers = [];
  script.forEach((s) => {
      if (s[2] !== scenePtr) {
        headers.push('yes');
        scenePtr = s[2];
      } else {
        headers.push('no');
      }
  });
  
  res.render('display.njk', {
    title,
    api_key,
    script,
    ptr,
    lock,
    images,
    headersOnly,
    headers,
  });
};

module.exports = { displayHandler };
