const url = require('url');
const logger = require('../services/logger');
const { getData, writeFile } = require('../services/file-service');

const offsetHandler = async (req, res) => {
  logger.log('info', "entering offset handler");
  let u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file);
  filmFoxFile.offset = u.query.offset;

  console.log(u.query);

  await writeFile(JSON.stringify(filmFoxFile), file);
  res.redirect(`/display?filmFoxFile=${file}&ptr=${ptr}`);
};

module.exports = { offsetHandler };
