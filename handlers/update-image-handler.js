const url = require("url");
const { smartLog } = require("../services/smart-log");
const {
  getListOfImages,
  getData,
  writeFile,
} = require("../services/file-service");

const updateImageHandler = async (req, res) => {
  smartLog("info", "entering updateImage handler");

  let u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  const title = u.query.title;
  const img = u.query.img.substring(4);
  const src = u.query.src;

  console.log({src});
  let filmFoxFile = await getData(title + ".fff");

  const { script } = filmFoxFile;

  const holdImage = script[img][5];

  script[img][5] = src;

  let carryOn = true;
  for (let i = parseInt(img) + 1; i < script.length; i++) {
    if (script[i][0] === "NARRATOR") {
      if (
        script[i][1].substring(0, 3) === "INT" ||
        script[i][1].substring(0, 3) === "EXT"
      ) {
        carryOn = false;
      }
    }

    if (script[i][5] === holdImage && carryOn) {
      script[i][5] = src;
    } else {
      carryOn = false;
    }
  }

  await writeFile(JSON.stringify(filmFoxFile), `${title}.fff`);

  res.redirect(`/display?filmFoxFile=${title}.fff&ptr=${ptr}&locked=no`);
};

module.exports = { updateImageHandler };
