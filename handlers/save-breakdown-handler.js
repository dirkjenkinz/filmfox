"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile, writeFile, createDirectory } = require("../services/file-service");

const saveBreakdownHandler = async (req, res) => {
  smartLog("info", "ENTERING SAVE BREAKDOWN HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { script } = filmFoxFile;
  let doc = [];
  script[sceneNumber].forEach((s) => {
    doc.push([s.character, s.dialogue])
  });
  
    res.render('breakdown.njk', {
    doc,
    title,
    sceneNumber,
    elementNumber,
  });
};

module.exports = { saveBreakdownHandler };
