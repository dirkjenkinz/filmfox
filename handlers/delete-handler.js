const url = require('url');
const { smartLog } = require('../services/smart-log');
const { deleteFile } = require('../services/file-service');

const deleteHandler = async (req, res) => {
  smartLog('info', 'entering delete handler');

  let u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  let element = u.query.element;
  element = '000000' + element;
  element = element.substring(element.length - 6);
  const script = u.query.script;
  const char = u.query.char;
  const el = `sound_${element}_${char}.mp3`
  await deleteFile(script, el);
  res.redirect(`/display?filmFoxFile=${script}.fff&ptr=${ptr}`);
};

module.exports = { deleteHandler };