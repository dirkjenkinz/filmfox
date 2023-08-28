const url = require("url");
const {
  getData,
  getListOfElements,
} = require("../services/file-service");
const { smartLog } = require("../services/smart-log");
const dotenv = require("dotenv");
dotenv.config();

const displayHandler = async (req, res) => {
  smartLog("info", "ENTERING DISPLAY HANDLER");

  let u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file);

  const { title, script } = filmFoxFile;
  const chrs = file.substring(0, file.length - 4) + ".chrs";
  const characters = await getData(chrs);
  const api_key = process.env.APIKEY;
  const offset = filmFoxFile.offset;

  script.forEach((scriptChar) => {
    characters.forEach((c) => {
      if (c[0] === scriptChar[0]) {
        scriptChar[3] = c[1];
      }
    });
  });

  ptr = parseInt(ptr);

  const end = script.length - 10;
  if (ptr > end) ptr = end;
  if (ptr < 0) ptr = 0;

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

  res.render("display.njk", {
    title,
    api_key,
    script,
    ptr,
    end,
    offset,
  });
};

module.exports = { displayHandler };
