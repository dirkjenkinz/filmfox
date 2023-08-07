const url = require('url');
const { getSoundFile } = require('../services/file-service');
const dotenv = require('dotenv');
dotenv.config();
const { smartLog } = require('../services/smart-log');

const playHandler = async (req, res) => {
  smartLog('info', 'entering play handler');
  let u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
  const element = u.query.element;
  const file = u.query.filmFoxFile;
  getSoundFile(file, `${element}.mp3`);
  console.log('done')

  res.redirect(`/display?filmFoxFile=${file}.fff&ptr=${ptr}`);
};

module.exports = { playHandler };