"use strict";

const url = require("url");
const { readFile } = require("../services/file-service");
const { smartLog } = require("../services/smart-log");
const dotenv = require("dotenv");
dotenv.config();

const displayHandler = async (req, res) => {
  smartLog("info", "ENTERING DISPLAY HANDLER");
  const u = url.parse(req.originalUrl, true);
  let sceneNumber = parseInt(u.query.sceneNumber);
  const title = u.query.title;
  if (!sceneNumber) sceneNumber = 0;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { script, shotList, charactersByScene, nonSpeakers } = filmFoxFile;
  const api_key = process.env.APIKEY;
  const characters = await readFile(`${title}/${title}.chrs`);
  const chars = [];

  characters.forEach((c) => {
    if (c[0] !== "NARRATOR") {
      chars.push(c[0]);
    }
  });

  nonSpeakers.forEach((n) => {
    chars.push(n);
  });

  res.render("display.njk", {
    title,
    api_key,
    scene: script[sceneNumber],
    sceneNumber,
    page: "Script Breakdown",
    highest: script.length,
    note: shotList[sceneNumber].note,
    characterList: charactersByScene[sceneNumber],
    characters: chars.sort(),
  });
};

module.exports = { displayHandler };
