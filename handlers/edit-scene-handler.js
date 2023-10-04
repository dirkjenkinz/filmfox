const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData } = require("../services/file-service");

const editSceneHandler = async (req, res) => {
  smartLog("info", "ENTERING EDIT SCENE HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const scene = u.query.scene;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script, shotList } = filmFoxFile;
  const elements = [];

  script.forEach((s, index) => {
    if (s.scene === parseInt(scene)) {
      note = shotList[scene].note;
      elements.push({
        number: index,
        speaker: s.character,
        dialogue: s.dialogue,
        image: s.image,
        type: s.type,
      });
    }
  });
  res.render("edit-scene.njk", {
    title,
    elements,
    scene,
    note,
  });
};

module.exports = { editSceneHandler };
