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
  const title = u.query.title;
  playSoundFile(title,`${element}`);
};

module.exports = { playHandler };