const url = require("url");
const { readFile } = require("../services/file-service");
const { smartLog } = require("../services/smart-log");
const dotenv = require("dotenv");
dotenv.config();

const displayHandler = async (req, res) => {
  smartLog("info", "ENTERING DISPLAY HANDLER");
  const u = url.parse(req.originalUrl, true);
  const locked = u.query.locked;
  let sceneNumber = parseInt(u.query.sceneNumber);
  const title = u.query.title;
  if (!sceneNumber) sceneNumber = 0;

  const filmFoxFile = await readFile(`${title}/${title}.fff`);

  let lock = "Unlock";

  if (locked === "no") {
    lock = "Lock";
  }

  const { script, shotList, charactersByScene } = filmFoxFile;
  const api_key = process.env.APIKEY;

  const characters = await readFile(`${title}/${title}.chrs`);
  
  res.render("display.njk", {
    title,
    api_key,
    lock,
    scene: script[sceneNumber],
    sceneNumber,
    page: "Script Breakdown",
    highest: script.length,
    note: shotList[sceneNumber].note,
    characterList: charactersByScene[sceneNumber],
    characters,
  });
};

module.exports = { displayHandler };
