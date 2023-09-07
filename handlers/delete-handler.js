const url = require('url');
const { smartLog } = require('../services/smart-log');
const { deleteFile } = require('../services/file-service');

const deleteHandler = async (req, res) => {
  smartLog('info', 'entering delete handler');

  let u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  let element = u.query.element;
  console.log({element})
  const script = u.query.script;

  await deleteFile(script, `sounds/${element}.mp3`);
  res.redirect(`/display?filmFoxFile=${script}&ptr=${ptr}`);
};

module.exports = { deleteHandler };