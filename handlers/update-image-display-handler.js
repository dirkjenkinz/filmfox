const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData, writeFile } = require("../services/file-service");

const updateImageDisplayHandler = async (req, res) => {
  smartLog("info", "entering UPDATE IMAGE DISPLAY handler");

  let u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  const title = u.query.title;
  const element = u.query.element;
  const image = u.query.image;
  const caller = u.query.caller;
  const scene = u.query.scene;

  let filmFoxFile = await getData(`${title}/${title}.fff`);

  const { script } = filmFoxFile;
  const holdImage = script[element][5];

  script[element][5] = image;

  let carryOn = true;
  for (let i = parseInt(element) + 1; i < script.length; i++) {
    if (script[i][0] === "NARRATOR") {
      if (
        script[i][1].substring(0, 3) === "INT" ||
        script[i][1].substring(0, 3) === "EXT"
      ) {
        carryOn = false;
      }
    }

    if (script[i][5] === holdImage && carryOn) {
      script[i][5] = image;
    } else {
      carryOn = false;
    }
  }
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  if (caller === "scenes") {
    res.redirect(`/scenes?title=${title}&ptr=${ptr}`);
  } else if ((caller === "edit-scene")) {
    res.redirect(
      `/edit-scene?title=${title}&ptr=${ptr}&element=${element}&scene=${scene}`
    );
  } else {
    res.redirect(
      `/display?title=${title}&ptr=${ptr}`
    );
  }
};

module.exports = { updateImageDisplayHandler };
