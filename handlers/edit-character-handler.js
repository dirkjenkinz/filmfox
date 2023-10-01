const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData } = require("../services/file-service");

const editCharacterHandler = async (req, res) => {
  smartLog("info", "ENTERING EDIT CHARACTER HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const character = u.query.character;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const  charactersList = await getData(`${title}/${title}.chrs`);

  const { script } = filmFoxFile;
  const elements = [];

  script.forEach((s, index) => {
    if (s.character === character) {
      elements.push({
        scene: s.scene,
        dialogue: s.dialogue,
        sound: s.sound,
        element: index,
        voice: s.voice,
      });
    }
  });

  let currentVoice;

  charactersList.forEach((c)=>{
    if (c[0] === character){
      currentVoice = c[1];
    };
  });

  res.render("edit-character.njk", {
    character,
    title,
    elements,
    currentVoice,
  });
};

module.exports = { editCharacterHandler };
