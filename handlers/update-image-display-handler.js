'use strict';
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, writeFile } = require('../services/file-service');

const updateImageDisplayHandler = async (req, res) => {
  smartLog('info', 'ENTERING UPDATE IMAGE DISPLAY HANDLDER');
  let u = url.parse(req.originalUrl, true);
  const sceneNumber = u.query.sceneNumber;
  const title = u.query.title;
  const elementNumber = u.query.elementNumber;
  const image = u.query.image;
  const caller = u.query.caller;

  let filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  let type = 'still';

  if (image.substring(image.length - 4) === '.mov') {
    type = 'movie';
  } else if (image.substring(image.length - 4) === '.mp4') {
    type = 'movie';
  } else if (image.substring(image.length - 4) === '.avi') {
    type = 'movie';
  } else if (image.substring(image.length - 4) === '.wmv') {
    type = 'movie';
  } else if (image.substring(image.length - 4) === '.mkv') {
    type = 'movie';
  };

  script[sceneNumber][elementNumber].type = type;

  let originalImage = script[sceneNumber][elementNumber].image;

  for (let i = elementNumber; i < script[sceneNumber].length; i++) {
    if (script[sceneNumber][i].image === originalImage) {
      script[sceneNumber][i].image = image;
      script[sceneNumber][i].type = type;
    }
  }

  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  if (caller === 'scenes') {
    res.redirect(`/scenes?title=${title}`);
  } else if (caller === 'showreel') {
    res.redirect(
      `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`
    );
  } else {
    res.redirect(
      `/display?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`
    );
  }
};

module.exports = { updateImageDisplayHandler };
