"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");

const creditsHandler = async (req, res) => {
  smartLog("info", "ENTERING CREDITS HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { credits } = filmFoxFile;

  if (!credits) {
    credits = {
      title: title,
      director: '',
      writer: '',
      producer: '',
    }
  };

  if (!credits.title){
    credits.title = title;
  };

  res.render("credits.njk", {
    title,
    credits,
    page: "Credits",
    sceneNumber,
    elementNumber,
  });
};


module.exports = { creditsHandler };
