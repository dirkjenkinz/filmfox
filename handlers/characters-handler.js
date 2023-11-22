'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile } = require('../services/file-service');

const charactersHandler = async (req, res) => {
  smartLog('info', 'ENTERING CHARACTERS HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { nonSpeakers, characterList } = filmFoxFile;

  res.render('characters.njk', {
    title,
    characters: characterList,
    page: 'Characters',
    nonSpeakers,
    sceneNumber,
    elementNumber,
  });
};
module.exports = { charactersHandler };
