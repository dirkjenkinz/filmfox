'use strict';
const url = require('url');
const { readFile, getFileList } = require('../services/file-service');
const { smartLog } = require('../services/smart-log');
const dotenv = require('dotenv');
dotenv.config();

const prepareReadyList = ((script, soundsList) => {
  let readyList = [];
  for (let i = 0; i < script.length; i++){
    readyList.push(0);
  };
  soundsList.forEach((s)=> {
    let scene = parseInt(s.substring(0,4));
    readyList[scene] ++;
  });

  script.forEach((s, index) => {
    if (s.length === readyList[index]){
      readyList[index] = 'yes';
    } else {
      readyList[index] = 'no';
    };
  });
  return readyList;
});

const soundHandler = async (req, res) => {
  smartLog('info', 'ENTERING SOUND HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const elementNumber = u.query.elementNumber;
  const sceneNumber = u.query.sceneNumber;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;
  const mergedList = await getFileList(`data/${title}/scenes`, 'mp3');
  const soundsList = await getFileList(`data//${title}/sounds`, 'mp3');

  const readyList = prepareReadyList(script, soundsList);
  let readyForMaster = 'yes';
  readyList.forEach((r) => {
    if (r === 'no') readyForMaster = 'no';
  });

  let masterExists = 'no';
  if (mergedList[0] === 'master.mp3') {
    masterExists = 'yes';
  };

  const merged = [];

  script.forEach((s, index) => {
    let template = `000000${index}`;
    template = template.substring(template.length - 5);
    template = `s${template}.mp3`;
    if (mergedList.indexOf(template) > -1) {
      merged.push('yes');
    } else {
      merged.push('no');
    }
  });

  res.render('sound.njk', {
    title,
    merged,
    script,
    masterExists,
    page: 'Sound',
    size: script.length,
    readyList,
    elementNumber,
    sceneNumber,
    readyForMaster,
  });
};

module.exports = { soundHandler };
