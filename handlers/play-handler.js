const url = require('url');
const { playSoundFile } = require('../services/file-service');
const dotenv = require('dotenv');
dotenv.config();
const { smartLog } = require('../services/smart-log');

const playHandler = async (req, res) => {
  smartLog('info', 'entering play handler');
  let u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
  const element = u.query.element;
  const file = u.query.filmFoxFile;
  console.log('>'+file+'<');
  console.log('>'+element+'<');
  playSoundFile(file,`${element}.mp3`);
 // res.redirect(`/display?filmFoxFile=${file}.fff&ptr=${ptr}`);
};

module.exports = { playHandler };