'use strict';

const url = require('url');
const { getFile, getFileList, writeFile } = require('../services/file-service');
const dotenv = require('dotenv');
dotenv.config();
const { smartLog } = require('../services/smart-log');

const compileSceneHandler = async (req, res) => {
  smartLog('info', 'ENTERING COMPILE SCENE HANDLER');
  let u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script, characterList } = filmFoxFile;
  const scene = script[sceneNumber];

  const soundFiles = await getFileList(`data/${title}/sounds`, 'mp3');
  const queue = [];
  scene.forEach((element, index) => {
    let sc = '0000' + sceneNumber;
    sc = sc.substring(sc.length - 4);
    let el = '0000' + index;
    el = el.substring(el.length - 4);
    const fileName = `${sc}_${el}.mp3`;
    let found = 'no';

    soundFiles.forEach((s) => {
      if (s === fileName) {
        found = 'yes';
      };
    });

    if (found === 'no') {
      let voice = '';
      characterList.forEach((c) => {
        if (c[0] == element.character) voice = c[1];
      });
      queue.push([sceneNumber, index, element.character, voice]);
    };
  });
  
  filmFoxFile.queue = queue;
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  res.redirect(`/process-queue?title=${title}`);
};

module.exports = { compileSceneHandler };
