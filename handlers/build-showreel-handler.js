'use strict';

const fs = require('fs');
const path = require('path');
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { registerFont } = require('canvas');
registerFont('C:/Windows/Fonts/arialbd.ttf', { family: 'Arial Bold' });
registerFont('C:/Windows/Fonts/timesbd.ttf', { family: 'Times Bold' });
const {
  readFile,
} = require('../services/file-service');

const buildShowreelHandler = async (req, res) => {
  smartLog('info', 'entering build showreel handler');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elemengNumber = u.query.sceneNumber;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  let t = 0.00;
  const showreel = [];
  script.forEach((s)=>{
    showreel.push({
      duration: s.duration,
      character: s.character,
      dialogue: s.dialogue,
      image: s.image,
      sound: `../data/${title}/sounds/${s.sound}`,
      type: s.type,
      sceneNumber: s.scene,
    });
    t = t + s.duration;
  });

  smartLog('info', 'showreel built');
  res.redirect(`/play-showreel?title=${title}&current=0&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
};

module.exports = { buildShowreelHandler };
