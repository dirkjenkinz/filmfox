'use strict';
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, writeFile } = require('../services/file-service');

const updateNoteHandler = async (req, res) => {
  smartLog('info', 'ENTERING UPDATE NOTE HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const val = u.query.val;
  const caller = u.query.caller;
  const mute = u.query.mute;
  const speak = u.query.speak;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const {shotList} = filmFoxFile;
  shotList[sceneNumber].note = val;



  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  if (caller === 'scenes'){
    res.redirect(`/scenes?title=${title}`);
  } else if ((caller === 'shot-list')){
    res.redirect(`scene-shot-list?title=${title}&sceneNumber=${sceneNumber}`);
  } else {
    res.redirect(`showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&mute=mute&speak=yes`);
  }
};

module.exports = { updateNoteHandler };
