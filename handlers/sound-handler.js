'use strict';
const url = require('url');
const { getFile, getFileList } = require('../services/file-service');
const { smartLog } = require('../services/smart-log');
const dotenv = require('dotenv');
dotenv.config();

const buildUncompiledList = ((script, characterList) => {
  const list = [];
  script.forEach((scene, sceneIndex) => {
    scene.forEach((s, soundIndex) => {
      if (s.sound === ''){
        let voice = [];
        characterList.forEach((c) => {
          if (c[0] === s.character) voice=c[1];
        });
        list.push([sceneIndex, soundIndex, s.character, voice]);
      };
    });
  });
  return list;
});

const prepareReadyList = ((script, soundsList) => {
  let readyList = [];
  for (let i = 0; i < script.length; i++) {
    readyList.push(0);
  };
  soundsList.forEach((s) => {
    let scene = parseInt(s.substring(0, 4));
    readyList[scene]++;
  });

  script.forEach((s, index) => {
    if (s.length === readyList[index]) {
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
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script, characterList } = filmFoxFile;
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

  const uncompiledList = buildUncompiledList(script, characterList);

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
    uncompiledList,
  });
};

module.exports = { soundHandler };
