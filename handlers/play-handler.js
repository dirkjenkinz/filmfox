const url = require('url');
const { playSoundFile, getDuration, getData, writeFile } = require('../services/file-service');
const dotenv = require('dotenv');
dotenv.config();
const { smartLog } = require('../services/smart-log');

/*
const procureDuration = async (title, elementName) => {
  let duration = await getDuration(title, elementName);
  return duration;
};
*/

const playHandler = async (req, res) => {
  smartLog('info', 'entering play handler');
  const u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  const sub = u.query.sub;
  const element = u.query.element;
  const title = u.query.title;
  playSoundFile(title,element, sub);
/*
  let filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script  } = filmFoxFile;

  for (let i = 0; i < script.length; i++){
    const duration = await procureDuration(title, `${script[i][4]}.mp3`);
    script[i][6] = duration;
  }

  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
*/

  if (sub === 'scenes'){
    res.redirect(`/merge?title=${title}&ptr=${ptr}`)
  } else {
    res.redirect(`/display?title=${title}&ptr=${ptr}`)
  }
};

module.exports = { playHandler };