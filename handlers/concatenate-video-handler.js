'use strict';

const url = require('url');
const path = require('path');
const { smartLog } = require('../services/smart-log');
const { getFile, writeFile } = require('../services/file-service');
const concat = require('ffmpeg-concat')

const concatenateVideoHandler = async (req, res) => {
  smartLog('info', 'ENTERING CONCATENATE VIDEO HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;

  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;
  const videoPath = path.join(__dirname, `../data/${title}/videos`);

  const videoArray = [];
  script.forEach((scene) => {
    videoArray.push(scene.length);
  });

  const videoList = [];

  for (let scene = 0; scene < videoArray.length; scene++) {
    for (let element = 0; element < videoArray[scene]; element++) {
      let sc = '0000' + scene;
      sc = sc.substring(sc.length - 4);
      let el = '0000' + element;
      el = el.substring(el.length - 4);
      videoList.push(`${videoPath}/${sc}_${el}.mp4`);
    }
  };

  console.log({videoList});

  const output = `${videoPath}/master.mp4`;

  await concat({
    output: output,
    videos: videoList,
    transition: {
      name: '',
      duration: 0
    }

  });

  res.redirect(`/video?title=${title}&sceneNumber=0`);
};

module.exports = { concatenateVideoHandler };
