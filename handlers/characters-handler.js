"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");

const charactersHandler = async (req, res) => {
  smartLog("info", "ENTERING CHARACTERS HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const {nonSpeakers, characterList} = filmFoxFile;
  
  res.render("characters.njk", {
    title,
    characters: characterList,
    page: 'Characters',
    nonSpeakers,
  });
};

module.exports = { charactersHandler };
