'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { readFile, writeFile } = require('../services/file-service');

const changeSceneOrderHandler = async (req, res) => {
  smartLog('info', 'ENTERING CHANGE SCENE ORDER HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const direction = u.query.direction;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const num = u.query.num;
  const top = u.query.top;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { sceneOrder } = filmFoxFile;

  let numOther;
  if (direction === 'down' ) {
    numOther = parseInt(num) + 1;
  } else {
    numOther = parseInt(num) - 1;
  };

  sceneOrder[num] = sceneOrder[num] + sceneOrder[numOther];
  sceneOrder[numOther] = sceneOrder[num] - sceneOrder[numOther];
  sceneOrder[num] = sceneOrder[num] - sceneOrder[numOther];
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  res.redirect(`/scene-arranger?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}&top=${top}`);
};

module.exports = { changeSceneOrderHandler };
