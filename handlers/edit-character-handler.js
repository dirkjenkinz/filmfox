'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile } = require('../services/file-service');

const editCharacterHandler = async (req, res) => {
  smartLog('info', 'ENTERING EDIT CHARACTER HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const msg = u.query.msg;
  const character = u.query.character;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const {characterList} = filmFoxFile;

  const { script } = filmFoxFile;

  const elements = [];

  
  script.forEach((s, scene_index) => {
    s.forEach((element, element_index) => {
      if (element.character === character) {
        elements.push({
          sceneNumber: scene_index,
          dialogue: element.dialogue,
          sound: element.sound,
          elementNumber: element_index,
          voice: element.voice,
        });
      }
    });
  });

  let currentVoice;

  characterList.forEach((c) => {
    if (c[0] === character) {
      currentVoice = c[1];
    }
  });

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
