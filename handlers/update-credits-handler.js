'use strict';
const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, writeFile } = require('../services/file-service');

const updateCreditsHandler = async (req, res) => {
  smartLog('info', 'ENTERING UPDATE CREDIT HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const val = u.query.val;
  const credit = u.query.credit;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;

  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  let {credits} = filmFoxFile;

  if (!credits) {
    credits = {
      title: title,
      director: '',
      writer: '',
      producer: '',
    };
  };
  
  switch (credit) {
    case 'title':
      credits.title = val;
      break;
    case 'director':
      credits.director = val;
      break;
      case 'producer':
      credits.producer = val;
      break;
    case 'writer':
      credits.writer = val;
      break;
  }

  filmFoxFile.credits = credits;

  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  res.redirect(`/credits?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
};

module.exports = { updateCreditsHandler };
