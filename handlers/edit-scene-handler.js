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
    let t;
    if (
      s[5].substring(s[5].length - 4) === "mpg" ||
      s[5].substring(s[5].length - 4) === ".avi" ||
      s[5].substring(s[5].length - 4) === ".mp4"
    ) {
      t = "movie";
    } else {
      t = "image";
    }

    if (s[2] === parseInt(scene)) {
      elements.push({
        number: index,
        speaker: s[0],
        dialogue: s[1],
        image: s[5],
        type: t,
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
