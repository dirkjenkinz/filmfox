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
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { breakdown } = filmFoxFile;

  const categories = [];


  breakdown[0].forEach((b)=>{
    categories.push(b[0]);
  });

  const list = [];
  breakdown.forEach((categories, index) => {
    const temp = [index];
    categories.forEach((c) => {
      if (c.length > 1){
        temp.push(c);
      };
    });
    if (temp.length > 1) {
      list.push(temp);
    };
  });

  res.render('categories.njk',{
    title,
    sceneNumber,
    elementNumber,
    categories,
    list,
  });

};

module.exports = { categoriesHandler };
