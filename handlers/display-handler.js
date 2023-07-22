const url = require('url');
const { getData, getListOfElements } = require('../services/file-service');
const dotenv = require('dotenv');
dotenv.config();

const displayHandler = async (req, res) => {
  console.log("entering display handler");

  let u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
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

  const elements = await getListOfElements(title);
  elements.forEach((e, index) => {
    e = e.substring(6);
    e = e.substring(0,6);
    elements[index] = parseInt(e);
  });
  
  script.forEach( (s) => {
    s.push('No');
  });

  elements.forEach((num) => {
    script[num][4] = 'Yes';
  });

  res.render('display.njk', {
    title,
    api_key,
    script,
    ptr,
    end,
  });
};

module.exports = { displayHandler };