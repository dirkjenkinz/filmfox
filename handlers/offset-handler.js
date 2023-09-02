const url = require('url');
const { getData, writeFile } = require('../services/file-service');
const { smartLog } = require('../services/smart-log');

const offsetHandler = async (req, res) => {
  smartLog('info', 'entering offset handler');
  let u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file);
  filmFoxFile.offset = u.query.offset;

  const {script} = filmFoxFile;

  for (let i = 0; i < script.length; i++){
    script[i][5] = 'blank.jpg';
  };

  await writeFile(JSON.stringify(filmFoxFile), file);
  res.redirect(`/display?filmFoxFile=${file}&ptr=${ptr}`);
};

module.exports = { offsetHandler };
