"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile, writeFile } = require("../services/file-service");

const addShotHandler = async (req, res) => {
  smartLog("info", "ENTERING ADD SHOT HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elemengNumber = u.query.sceneNumber;
  const line = u.query.line;

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { shotList } = filmFoxFile;

  const shot = shotList[sceneNumber].lines;
  const newLine = {
    shot: "-",
    angle: "-",
    move: "-",
    audio: "-",
    subject: "",
    description: "",
  };

  shot.splice(parseInt(line) + 1, 0, newLine);
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  res.redirect(`/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}&elementNumber`);
};

module.exports = { addShotHandler };
