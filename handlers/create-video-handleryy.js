'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile } = require('../services/file-service');
const path = require('path');
var ffmpeg = require('fluent-ffmpeg');

const imgToMP4 = (sound, image, output) => {
  smartLog('info', `Converting ${image}`);

  let command = ffmpeg(image)
    .input(sound)
    .inputFPS(1)
    .audioCodec('libmp3lame')
    .audioBitrate(128)
    .videoCodec('libx265')
    .size('640x?')
    .output(output)
    .on('end', function () {
      smartLog('info', `${output} created`);
    });
  command.run();
};

const createVideoHandler = async (req, res) => {
  smartLog('info', 'ENTERING CREATE VIDEO HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const soundPath = path.join(__dirname, `../data/${title}/sounds`);
  const imagePath = path.join(__dirname, `../data/${title}/images`);
  const outPath = path.join(__dirname, `../data/${title}/videos`);

  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  smartLog('info', `${title}.fff retrieved`);
  const { script } = filmFoxFile;

  const scene = script[sceneNumber];

  scene.forEach(async (s, index) => {
    let num = '0000' + sceneNumber;
    num = num.substring(num.length - 4);
    let sub = '0000' + index;
    sub = sub.substring(sub.length - 4);
    const fileName = `${num}_${sub}.mp3`;
    const sound = `${soundPath}/${fileName}`;
    const image = `${imagePath}/${s.image}`;
    const output = `${outPath}/${num}_${sub}.mp4`;
    imgToMP4(sound, image, output);
  });

  res.redirect(`/video?title=${title}&sceneNumber=${sceneNumber}`);
};

module.exports = { createVideoHandler };
