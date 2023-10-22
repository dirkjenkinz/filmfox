"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const { deleteFile, readFile, writeFile } = require("../services/file-service");

const deleteHandler = async (req, res) => {
  smartLog("info", "entering delete handler");
  const u = url.parse(req.originalUrl, true);
  const sceneNumber = u.query.sceneNumber;
  const element = u.query.element;
  const title = u.query.title;
  const sub = u.query.sub;
  const num = u.query.num;
  await deleteFile(title, element, sub);

  if (sub === "sounds") {
    const filmFoxFile = await readFile(`${title}/${title}.fff`);
    let { script } = filmFoxFile;
    script[num].sound = "";
    script[num].duration = 0.000;
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  }

  if (sub === "sounds") {
    res.redirect(`/showreel?title=${title}&sceneNumber=${sceneNumber}`);
  } else {
    res.redirect(`/sound?title=${title}&sceneNumber=${sceneNumber}`);
  }
};

module.exports = { deleteHandler };
