const url = require('url');
const { readFile, getListOfElements } = require('../services/file-service');
const { smartLog } = require('../services/smart-log');
const dotenv = require('dotenv');
dotenv.config();

const displayHandler = async (req, res) => {
  smartLog('info', 'ENTERING DISPLAY HANDLER');
  const u = url.parse(req.originalUrl, true);
  const locked = u.query.locked;
  let scene = parseInt(u.query.scene);
  const title = u.query.title;
  if (!scene) scene = 0;

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  
  let lock = 'Unlock';

  if (locked === 'no') {
    lock = 'Lock';
  };


  const { script, shotList } = filmFoxFile;
  const characters = await readFile(`${title}/${title}.chrs`);
  const api_key = process.env.APIKEY;
  
  res.render('display.njk', {
    title,
    api_key,
    lock,
    scene: script[scene],
    sceneNumber: scene,
    page : 'Display',
    highest: script.length,
    note: shotList[scene].note,
  });
};

module.exports = { displayHandler };
