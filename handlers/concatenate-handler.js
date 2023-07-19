const url = require('url');
const { getData } = require('../services/file-service');
const dotenv = require('dotenv');
dotenv.config();
const { concatenateFiles } = require('../services/concat');

const concatenateHandler = async (req, res) => {
  console.log("entering concatenate handler");

  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const filmFoxFile = await getData(`${title}.fff`);

  const { characters, script } = filmFoxFile;
  const api_key = process.env.APIKEY;

  script.forEach(scriptChar => {
    characters.forEach(c => {
      if (c[0] === scriptChar[0]) {
        scriptChar[3] = c[1];
      };
    })
  });

  concatenateFiles(title);

  res.render('display.njk', {
    title,
    api_key,
    script,
  });
};

module.exports = { concatenateHandler };