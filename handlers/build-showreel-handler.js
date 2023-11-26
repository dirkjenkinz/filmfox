'use strict';

const fs = require('fs');
const path = require('path');
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { registerFont } = require('canvas');
registerFont('C:/Windows/Fonts/arialbd.ttf', { family: 'Arial Bold' });
registerFont('C:/Windows/Fonts/timesbd.ttf', { family: 'Times Bold' });
const {
  getFile, getDuration,
} = require('../services/file-service');

const buildShowreelHandler = async (req, res) => {
  smartLog('info', 'ENTERING BUILD SHOWREEL HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;
  const showreel = [];
  script.forEach(async (s, index) => {
    let sc = '0000' + sceneNumber;
    sc = sc.substring(sc.length - 4);
    let el = '0000' + index;
    el = el.substring(el.length - 4);
    const fileName = `${sc}_${el}.mp3`;
    const duration = await getDuration(title, fileName);

    showreel.push({
      duration: duration,
      character: s.character,
      dialogue: s.dialogue,
      image: s.image,
      sound: `../data/${title}/sounds/${fileName}`,
      type: s.type,
      sceneNumber: s.scene,
    });
  });

  smartLog('info', 'showreel built');
  res.redirect(`/play-showreel?title=${title}&current=0&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
};

module.exports = { buildShowreelHandler };
