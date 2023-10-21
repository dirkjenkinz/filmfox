"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile, writeFile } = require("../services/file-service");

const deleteCharacterFromSceneHandler = async (req, res) => {
  smartLog("info", "ENTERING DELETE CHARACTER FROM SCENE HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const character = u.query.character;
  const sceneNumber = u.query.sceneNumber;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { charactersByScene } = filmFoxFile;
  const pointer = charactersByScene[sceneNumber].indexOf(character);
  console.log(charactersByScene[sceneNumber]);
  charactersByScene[sceneNumber].splice(pointer, 1);


  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  res.redirect(`/display?title=${title}&sceneNumber=${sceneNumber}`);
};

module.exports = { deleteCharacterFromSceneHandler };
