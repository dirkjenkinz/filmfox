'use strict';
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, getFileList, fileExists } = require('../services/file-service');

const videoHandler = async (req, res) => {
  smartLog('info', 'ENTERING VIDEO HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const elementNumber = u.query.elementNumber;
  const sceneNumber = u.query.sceneNumber;
  const { script } = filmFoxFile;
  const videoList = await getFileList(`data//${title}/videos`, 'mp4');
  const gen = [];
  for (let i = 0; i < script.length; i++) {
    let num = '0000' + i;
    num = num.substring(num.length - 4);
    let found = 'no';
    for (let j = 0; j < videoList.length; j++) {
      if (videoList[j].substring(0, 4) === num) found = 'yes';
    };
    gen.push(found);
  };

  let soundFiles = await getFileList(`data/${title}/sounds`, 'mp3');
  let fileNotFound = [];

  for (let i = 0; i < script.length; i++) {
    for (let j = 0; j < script[i].length; j++) {
      let sc = '0000' + i;
      sc = sc.substring(sc.length - 4);
      let el = '0000' + j;
      el = el.substring(el.length - 4);
      const fileName = `${sc}_${el}.mp3`;
      let found = 'no';
      soundFiles.forEach((s) => {
        if (s === fileName) {
          found = 'yes';
        };
      });
      if (found === 'no') {
        fileNotFound.push(fileName.substring(0, 4));
      };
    };
  };

  fileNotFound = [...new Set(fileNotFound)];

  const complete = [];

  script.forEach(() => {
    complete.push('yes');
  });

  fileNotFound.forEach((f) => {
    let num = parseInt(f);
    complete[num] = 'no';
  });

  
  res.render('video.njk', {
    title,
    script,
    page: 'Video',
    elementNumber,
    sceneNumber,
    gen,
    complete,
  });
};

module.exports = { videoHandler };
