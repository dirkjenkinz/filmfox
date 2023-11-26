'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, fileExists } = require('../services/file-service');

const editCharacterHandler = async (req, res) => {
  smartLog('info', 'ENTERING EDIT CHARACTER HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const msg = u.query.msg;
  const character = u.query.character;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { characterList } = filmFoxFile;

  const { script } = filmFoxFile;

  const elements = [];

  script.forEach((s, scene_index) => {
    s.forEach((element, element_index) => {
      if (element.character === character) {
        elements.push({
          sceneNumber: scene_index,
          dialogue: element.dialogue,
          elementNumber: element_index,
          voice: element.voice,
        });
      }
    });
  });

  elements.forEach((e) => {
    let num = '0000' + e.sceneNumber;
    num = num.substring(num.length - 4);
    let sub = '0000' + e.elementNumber;
    sub = sub.substring(sub.length - 4);
    const fileName = `${num}_${sub}.mp3`;
    if (fileExists(`${title}/sounds/${fileName}`)) {
      console.log('yes');
      e.sound = fileName;
    } else {
      e.sound = '';
    }
  });

  let currentVoice;

  characterList.forEach((c) => {
    if (c[0] === character) {
      currentVoice = c[1];
    }
  });

///  console.log({elements})

  res.render('edit-character.njk', {
    character,
    title,
    elements,
    currentVoice,
    page: 'Edit Character',
    msg,
    sceneNumber,
    elementNumber,
  });
};

module.exports = { editCharacterHandler };
