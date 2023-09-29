const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData } = require("../services/file-service");

const editCharacterHandler = async (req, res) => {
  smartLog("info", "ENTERING EDIT CHARACTER HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const character = u.query.character;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  const elements = [];

  script.forEach((s, index) => {
    if (s.character === character) {
      elements.push({
        scene: s.scene,
        dialogue: s.dialogue,
        sound: s.sound,
        element: index,
      });
    }
  });
  res.render("edit-character.njk", {
    character,
    title,
    elements,
  });
};

module.exports = { editCharacterHandler };
