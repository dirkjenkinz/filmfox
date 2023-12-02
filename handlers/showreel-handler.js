'use strict';
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, getFileList } = require('../services/file-service');

const showreelHandler = async (req, res) => {
  smartLog('info', 'ENTERING SHOWREEL HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  let sceneNumber = u.query.sceneNumber;
  let elementNumber = u.query.elementNumber;
  let mute = u.query.mute;
  if (!mute) mute = 'MUTE';
  const msg = u.query.msg;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script, shotList, charactersByScene, nonSpeakers, characterList } = filmFoxFile;

  if (sceneNumber > script.length -1){
    sceneNumber = script.length -1;
    elementNumber = script[sceneNumber].length - 1;
  }

  if (!sceneNumber) sceneNumber = 0;
  if (!elementNumber) elementNumber = 0;

  if (elementNumber === '-1') {
    sceneNumber--;
    elementNumber = script[sceneNumber].length - 1;
  };

  if (elementNumber > script[sceneNumber].length - 1) elementNumber = 0;
  const element = script[sceneNumber][elementNumber];
  const slug = script[sceneNumber][0].dialogue;

  let audio = '';

  let num = '0000' + sceneNumber;
  num = num.substring(num.length - 4);
  let sub = '0000' + elementNumber;
  sub = sub.substring(sub.length - 4);
  const fileName = `${num}_${sub}.mp3`;
  const soundsList = await getFileList(`data//${title}/sounds`, 'mp3');

  if (soundsList.indexOf(fileName) !== -1) {
    audio = `../data/${title}/sounds/${fileName}`;
    element.sound = fileName;
  } else {
    element.sound = '';
  };

  let chars = [];

  characterList.forEach((c) => {
    if (c[0] !== 'NARRATOR') {
      chars.push(c[0]);
    }
  });

  nonSpeakers.forEach((n) => {
    chars.push(n);
  });

  if (charactersByScene[sceneNumber]) {
    charactersByScene[sceneNumber].forEach((c) => {
      const pointer = chars.indexOf(c);
      chars.splice(pointer, 1);
    });
  }
  characterList.forEach((c) => {
    if (c[0] === element.character.toUpperCase()) {
      element.voice = c[1];
    }
  });

  const noteList = [];
  const slugList = [];
  script.forEach((s) => {
    noteList.push(s.note + '@@');
    slugList.push(s[0].dialogue + '@@');
  });

  res.render('showreel.njk', {
    sceneNumber,
    elementNumber,
    highestElement: script[sceneNumber].length - 1,
    highestScene: script.length - 1,
    title,
    element,
    mute,
    slug,
    page: 'Showreel',
    audio,
    note: shotList[sceneNumber].note,
    characterList: charactersByScene[sceneNumber].sort(),
    characters: chars.sort(),
    voice: element.voice,
    slugList,
    noteList,
    msg
  });
};

module.exports = { showreelHandler };
