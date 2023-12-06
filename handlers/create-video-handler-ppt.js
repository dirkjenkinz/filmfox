'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, getDuration } = require('../services/file-service');
const path = require('path');
const fs = require('fs');
const pptxgen = require('pptxgenjs');
let pres = new pptxgen();

const addToPPt = (title, num, sub, text, image, output) => {
  console.log(num, sub);
  console.log({image});
  let slide = pres.addSlide();

  slide.addImage({ x: 0.2, y: 1.0, w: 6.0, h: 4.0, path: image });

  slide.addText(`${title} - Scene ${num}`, {
    x: 0.5,
    y: 0.5,
    color: '363636',
    fill: { color: 'F1F1F1' },
    align: pres.AlignH.left,
  });

  slide.addText(`element ${sub}`, {
    x: 0.5,
    y: 0.8,
    color: '363636',
    fill: { color: 'F1F1F1' },
    fontFace: 'Arial',
    fontSize: 8,
    align: pres.AlignH.left,
  });

  slide.addText(text, {
    x: 6.3,
    y: 2.0,
    w: 3.5,
    color: '363636',
    fill: { color: 'F1F1F1' },
    fontFace: 'Arial',
    fontSize: 10,
    bold: true,
    isTextBox: true,
    align: pres.AlignH.left,
  });
};

const createVideoHandler = async (req, res) => {
  smartLog('info', 'ENTERING CREATE VIDEO HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const imagePath = path.join(__dirname, `../data/${title}/images`);
  const outPath = path.join(__dirname, `../data/${title}/ppt`);

  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  smartLog('info', `${title}.fff retrieved`);
  const { script } = filmFoxFile;

 // const scene = script[sceneNumber];


  const output = `${outPath}/master.pptx`;

script.forEach((scene, sceneNumber) => {
  scene.forEach(async (s, index) => {
    let num = '0000' + sceneNumber;
    num = num.substring(num.length - 4);
    let sub = '0000' + index;
    sub = sub.substring(sub.length - 4);
    const fileName = `${num}_${sub}.mp3`;
    const dur = getDuration(title, fileName);
    const image = `${imagePath}/${s.image}`;
    let duration = Math.ceil(dur) + 1;
    if (duration < 4) duration = 4;
    let text = s.dialogue;
    if (s.character !== 'NARRATOR') {
      text = `${s.character}:
    
${s.dialogue}`;
    };
    addToPPt(title, num, sub, text, image, output);
  });
});

console.log('1.');
pres.writeFile({ fileName: output });
console.log('2');

  res.redirect(`/video?title=${title}&sceneNumber=${sceneNumber}`);
};

module.exports = { createVideoHandler };
