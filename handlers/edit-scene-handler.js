const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData } = require("../services/file-service");

const editSceneHandler = async (req, res) => {
  smartLog("info", "ENTERING EDIT SCENE HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const ptr = u.query.ptr;
  const scene = u.query.scene;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  const elements = [];

  script.forEach((s, index) => {

    if (s.scene === parseInt(scene)) {
      elements.push({
        number: index,
        speaker: s.speaker,
        dialogue: s.dialogue,
        image: s.image,
        type: s.type,
      });
    }
  });

  res.render("edit-scene.njk", {
    title,
    elements,
    ptr,
    scene,
  });
};

module.exports = { editSceneHandler };
