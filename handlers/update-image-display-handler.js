const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData, writeFile } = require("../services/file-service");

const updateImageDisplayHandler = async (req, res) => {
  smartLog("info", "entering UPDATE IMAGE DISPLAY handler");

  let u = url.parse(req.originalUrl, true);
  const sceneNumber = u.query.sceneNumber;
  const title = u.query.title;
  const element = u.query.element;
  const image = u.query.image;
  const caller = u.query.caller;
  const scene = u.query.scene;

  let filmFoxFile = await getData(`${title}/${title}.fff`);

  const { script } = filmFoxFile;
  const holdImage = script[element].image;

  script[element].image = image;

  let carryOn = true;
  for (let i = parseInt(element) + 1; i < script.length; i++) {
    if (script[i].character === "NARRATOR") {
      if (
        script[i].dialogue.substring(0, 3) === "INT" ||
        script[i].dialogue.substring(0, 3) === "EXT"
      ) {
        carryOn = false;
      }
    }

    if (script[i].image === holdImage && carryOn) {
      script[i].image = image;
    } else {
      carryOn = false;
    }
  }
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  if (caller === "scenes") {
    res.redirect(`/scenes?title=${title}&sceneNumber=${sceneNumber}`);
  } else if ((caller === "edit-scene")) {
    res.redirect(
      `/edit-scene?title=${title}&sceneNumber=${sceneNumber}&element=${element}&scene=${scene}`
    );
  } else {
    res.redirect(
      `/display?title=${title}&sceneNumber=${sceneNumber}`
    );
  }
};

module.exports = { updateImageDisplayHandler };
