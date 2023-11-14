'use strict';
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { readFile } = require('../services/file-service');

const videoHandler = async (req, res) => {
  smartLog('info', 'ENTERING VIDEO HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const elementNumber = u.query.elementNumber;
  const sceneNumber = u.query.sceneNumber;
  const { script } = filmFoxFile;

  const gen = [];

  script.forEach((s, index) => {
    if (s[0].sound){
      gen.push('yes');
    } else {
      gen.push('no');
    }
  });

   res.render('video.njk', {
    title,
    script,
    page: 'Video',
    elementNumber,
    sceneNumber,
  });
};

module.exports = { videoHandler };
