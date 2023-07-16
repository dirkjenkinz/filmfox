const url = require('url');
const { getData } = require('../file-service');

const displayHandler = async (req, res) => {
  console.log("entering display handler");

  const u = url.parse(req.originalUrl, true);
  const fff = u.query.file;

  let data = await getData(fff);

  const {script, characters, api_key, voice_data} = data

  res.render('display.njk', {
    script,
    characters,
    api_key,
    voice_data,
  });
};

module.exports = { displayHandler };