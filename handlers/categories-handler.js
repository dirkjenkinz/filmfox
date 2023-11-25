'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile } = require('../services/file-service');

const categoriesHandler = async (req, res) => {
  smartLog('info', 'ENTERING CATEGORIES HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  let category = u.query.category;
  let { breakdown } = filmFoxFile;

  const categories = [];

  breakdown[0].forEach((b) => {
    categories.push([b[0], 'n']);
  });

  const list = [];
  breakdown.forEach((categories, index) => {
    const temp = [index];
    categories.forEach((c) => {
      if (c.length > 1) {
        temp.push(c);
      };
    });
    if (temp.length > 1) {
      list.push(temp);
    };
  });

  list.forEach((scene) => {
    scene.forEach((s) => {
      categories.forEach((c) => {
        if (c[0] === s[0]) {
          c[1] = 'y';
        };
      });
    });
  });

  const displayList = [];
  if (category) {
    list.forEach((scene) => {
      scene.forEach((s) => {
        if (category === s[0]) {
          displayList.push([scene[0], s]);
        };
      });
    });
  } else {
    category = '';
  };

  res.render('categories.njk', {
    title,
    sceneNumber,
    elementNumber,
    categories,
    list,
    category,
    displayList,
  });

};

module.exports = { categoriesHandler };
