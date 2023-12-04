'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, getDuration } = require('../services/file-service');
const videoshow = require('videoshow');
const path = require('path');
const FFmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const imgToMP4 = (sound, image, duration, output) => {
  smartLog('info', `Converting ${image}`);
  const images = [image];

  const videoOptions = {
    fps: 10,
    loop: duration,
    transition: false,
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x?',
    audioBitrate: '128k',
    audioChannels: 2,
    format: 'mp4',
    pixelFormat: 'yuv420p',
  };

  videoshow([
    {
      path: image,
    },
  ])
    .audio(sound)
    .save(output)
    .on('start', function (command) {
      smartLog('info', `ffmpeg process started: ${image}`);
    })
    .on('error', function (err) {
      smartLog('error', err);
    })
    .on('end', function (output) {
      smartLog('info', `Video created: ${output}`);
    });
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

  scene.forEach( async (s, index) => {
      let num = '0000' + sceneNumber;
      num = num.substring(num.length - 4);
      let sub = '0000' + index;
      sub = sub.substring(sub.length - 4);
      const fileName = `${num}_${sub}.mp3`;
      const dur = await getDuration(title, fileName);

      const caption = `${s.character}: ${s.dialogue}`;
      const sound = `${soundPath}/${fileName}`;
      const image = `${imagePath}/${s.image}`;
      let duration = Math.ceil(dur) + 1;
      if (duration < 4 ) duration = 4;
      const output = `${outPath}/${num}_${sub}.mp4`;
      if (s.type === 'movie') {
        new FFmpeg()
        .addInput(image)
        .addInput(sound)
        .save(output);
      } else {
        imgToMP4(sound, image, duration, output);
      }
  });

  res.redirect(`/video?title=${title}&sceneNumber=${sceneNumber}`);
};

module.exports = { createVideoHandler };
