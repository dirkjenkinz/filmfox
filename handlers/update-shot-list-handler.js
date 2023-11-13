"use strict";
const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile, writeFile } = require("../services/file-service");

const updateShotListHandler = async (req, res) => {
  smartLog("info", "ENTERING UPDATE SHOTLIST HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const val = u.query.val;
  const item = u.query.item;
  const line = u.query.line;
  console.log({val});
  console.log(({item}));
  console.log({line});

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const {shotList} = filmFoxFile;
  console.log(shotList[sceneNumber]);
  shotList[sceneNumber].lines[line][`${item}`] = val;
  console.log(shotList[sceneNumber]);
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  res.redirect(`/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}`)
};

module.exports = { updateShotListHandler };
