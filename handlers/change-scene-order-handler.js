"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile, writeFile } = require("../services/file-service");

const changeSceneOrderHandler = async (req, res) => {
  smartLog("info", "ENTERING CHANGE SCENE ORDER HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const direction = u.query.direction;
  const num = u.query.num;
  let hidden = u.query.hidden;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { sceneOrder } = filmFoxFile;

  let numOther;
  if (direction === 'down' ) {
    numOther = parseInt(num) + 1;
  } else {
    numOther = parseInt(num) - 1;
  };

  hidden = hidden.split(',');
  const temp = hidden[num];
  hidden[num] = hidden[numOther];
  hidden[numOther] = temp;

  sceneOrder[num] = sceneOrder[num] + sceneOrder[numOther];
  sceneOrder[numOther] = sceneOrder[num] - sceneOrder[numOther];
  sceneOrder[num] = sceneOrder[num] - sceneOrder[numOther]
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  res.redirect(`/scene-arranger?title=${title}&hidden=${hidden}`);
};

module.exports = { changeSceneOrderHandler };
