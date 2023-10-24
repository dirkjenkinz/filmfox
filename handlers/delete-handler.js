"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const { deleteFile, readFile, writeFile } = require("../services/file-service");

const deleteHandler = async (req, res) => {
  smartLog("info", "ENTERING DELETE HANDLER");
  const u = url.parse(req.originalUrl, true);
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const title = u.query.title;
  const mute = u.query.mute;
  const fileName = u.query.fileName;

  await deleteFile(title, 'sounds', fileName);

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { script } = filmFoxFile;
  script[sceneNumber][elementNumber].sound = "";
  script[sceneNumber][elementNumber].duration = 0.0;
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  res.redirect(
    `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&mute=${mute}`
  );
};

module.exports = { deleteHandler };
