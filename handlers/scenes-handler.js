const url = require("url");
const { getData, getListOfElements, writeFile } = require("../services/file-service");
const { smartLog } = require("../services/smart-log");

const scenesHandler = async (req, res) => {
  smartLog("info", "ENTERING SCENES HANDLER");

  const u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  const title = u.query.title;
  let filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  const scenes = [];
  
  let scenePtr = -1
  let elements = [];
  script.forEach((s, index) => {
    if (s[2] !== scenePtr) {
      scenes.push(s);
      elements.push(index);
      scenePtr = s[2];
    };
  });

  let imageType = [];
  let images = [];
  for (let i = 0; i < scenes.length; i++) {
    if (scenes[i][5].substring(scenes[i][5].length - 4) === ".mov") {
      imageType.push("movie");
      images.push([scenes[i][5], "movie"])
    } else if (scenes[i][5].substring(scenes[i][5].length - 4) === ".mp4") {
      imageType.push("movie");
      images.push([scenes[i][5], "movie"])
    } else {
      imageType.push("still");
      images.push([scenes[i][5], "still"])
    }
  }

  res.render("scenes.njk", {
    title,
    scenes,
    ptr,
    images,
    elements,
  });
};

module.exports = { scenesHandler };
