'use strict';
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { readFile, getFileList } = require('../services/file-service');

const videoHandler = async (req, res) => {
  smartLog('info', 'ENTERING VIDEO HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const elementNumber = u.query.elementNumber;
  const sceneNumber = u.query.sceneNumber;
  const { script } = filmFoxFile;

  const gen = [];

  const videoList = await getFileList(`data//${title}/videos`, 'mp4');

  for (let i = 0; i < script.length; i++){
    let num = '0000' + i;
    num = num.substring(num.length - 4);
    let found = 'no';
    for (let j = 0; j < videoList.length; j++){
      if (videoList[j].substring(0,4) === num) found = 'yes';
    };
    gen.push(found);
  };

  res.render('video.njk', {
    title,
    script,
    page: 'Video',
    elementNumber,
    sceneNumber,
    gen,
  });
};

module.exports = { videoHandler };
