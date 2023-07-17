const url = require('url');
const { getData} = require('../file-service');

const displayHandler = async (req, res) => {
  console.log("entering display handler");

  let u = url.parse(req.originalUrl, true);
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file);

  const {title, api_key, characters, script} = filmFoxFile;

  res.render('display.njk', {
    title,
    api_key,
    script,
  });
};

module.exports = { displayHandler };