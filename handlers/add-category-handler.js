'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { readFile, writeFile } = require('../services/file-service');

const addCategoryHandler = async (req, res) => {
  smartLog('info', 'ENTERING ADD CATEGORY HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const category = u.query.category;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { breakdown } = filmFoxFile;

  breakdown.forEach((b) => {
    b.push([category]);
  });

  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  res.redirect(`/categories?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`);
};

module.exports = { addCategoryHandler };
