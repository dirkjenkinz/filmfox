'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { readFile } = require('../services/file-service');

const categoriesHandler = async (req, res) => {
  smartLog('info', 'ENTERING CATEGORIES HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const category = u.query.category;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { breakdown } = filmFoxFile;

  const categories = [];

  breakdown[0].forEach((b)=>{
    categories.push(b[0]);
  });

  res.render('categories.njk',{
    title,
    sceneNumber,
    elementNumber,
    categories,
  });

};

module.exports = { categoriesHandler };
