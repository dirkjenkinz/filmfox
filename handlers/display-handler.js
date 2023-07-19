const url = require('url');
const { getData } = require('../services/file-service');
const dotenv = require('dotenv');
dotenv.config();

const displayHandler = async (req, res) => {
  console.log("entering display handler");

  let u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
  console.log({ptr})
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file);

  const { title, characters, script } = filmFoxFile;
  const api_key = process.env.APIKEY;

  script.forEach(scriptChar => {
    characters.forEach(c => {
      if (c[0] === scriptChar[0]) {
        scriptChar[3] = c[1];
      };
    })
  });

  ptr = parseInt(ptr);
  const end = script.length - 10;
  if (ptr > end) ptr = end;
  if (ptr < 0) ptr = 0;

  res.render('display.njk', {
    title,
    api_key,
    script,
    ptr,
    end,
  });
};

module.exports = { displayHandler };