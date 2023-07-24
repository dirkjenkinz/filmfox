const url = require('url');
const voices = require('../data/voices.json');
const logger = require('../services/logger');

const {
  getSRT,
} = require('../services/file-service');

const srtHandler = async (req, res) => {
  logger.log('info', 'entering srt handler');
  const u = url.parse(req.originalUrl, true);
  let title = u.query.title;
  let ptr = u.query.ptr;

  let srt = await getSRT(title);

  srt = srt.split('\n');

  res.render('srt.njk', {
    srt,
    ptr,
    title,
  });
};

module.exports = { srtHandler };
