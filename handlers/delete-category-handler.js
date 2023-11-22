'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, writeFile } = require('../services/file-service');

const deleteCategoryHandler = async (req, res) => {
  smartLog('info', 'ENTERING DELETE CATEGORY HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const category = u.query.category;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  let { breakdown } = filmFoxFile;

  for (let i = 0; i < breakdown.length; i++){
    const newCategories = [];
      breakdown[i].forEach((categories) => {
        if (categories[0] !== category) newCategories.push(categories);
      });
      breakdown[i] = newCategories;
    };
  
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  res.redirect(`/categories?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`);
};

module.exports = { deleteCategoryHandler };
