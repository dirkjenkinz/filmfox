"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");

const editCharacterHandler = async (req, res) => {
  smartLog("info", "ENTERING EDIT CHARACTER HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const character = u.query.character;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const charactersList = await readFile(`${title}/${title}.chrs`);

  const { script } = filmFoxFile;

  const elements = [];

  script.forEach((s) => {
    s.forEach((element, index) => {
      if (element.character === character) {
        elements.push({
          scene: element.scene,
          dialogue: element.dialogue,
          sound: element.sound,
          element: index,
          voice: element.voice,
        });
      }
    });
  });

  let currentVoice;

  charactersList.forEach((c) => {
    if (c[0] === character) {
      currentVoice = c[1];
    }
  });

  res.render("edit-character.njk", {
    character,
    title,
    elements,
    currentVoice,
    page: "Edit Character",
  });
};

module.exports = { editCharacterHandler };
