const url = require("url");
const { getData, getListOfElements } = require("../services/file-service");
const { smartLog } = require("../services/smart-log");
const dotenv = require("dotenv");
dotenv.config();

const displayHandler = async (req, res) => {
  smartLog("info", "ENTERING DISPLAY HANDLER");

  const u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  const locked = u.query.locked;
  const file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file);

  let lock = 'Unlock';
  if (locked === 'no') {
    lock = 'Lock'
  };

  const { title, script } = filmFoxFile;
  const chrs = file.substring(0, file.length - 4) + ".chrs";
  const characters = await getData(chrs);
  const api_key = process.env.APIKEY;

  script.forEach((scriptChar) => {
    characters.forEach((c) => {
      if (c[0] === scriptChar[0]) {
        scriptChar[3] = c[1];
      }
    });
  });


  const elements = await getListOfElements(title);
  elements.forEach((e, index) => {
    e = e.substring(6);
    e = e.substring(0, 6);
    elements[index] = parseInt(e);
  });

  script.forEach((s) => {
    s.push("");
  });

  const elementNames = await getListOfElements(title);

  script.forEach((s) => {
    s[4] = "";
  });

  elementNames.forEach((name) => {
    const num = parseInt(name.substring(6, 12));
    script[num][4] = name.substring(0, name.length - 4);
  });

  let imageType = [];
  let images = [];
  for (let i = 0; i < script.length; i++) {
    if (script[i][5].substring(script[i][5].length - 4) === ".mov") {
      imageType.push("movie");
      images.push([script[i][5], "movie"])
    } else if (script[i][5].substring(script[i][5].length - 4) === ".mp4") {
      imageType.push("movie");
      images.push([script[i][5], "movie"])
    } else {
      imageType.push("still");
      images.push([script[i][5], "still"])
    }
  }

  res.render("display.njk", {
    title,
    api_key,
    script,
    ptr,
    lock,
    images,
  });
};

module.exports = { displayHandler };
