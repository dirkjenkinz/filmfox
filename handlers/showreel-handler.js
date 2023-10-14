const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");

const showreelHandler = async (req, res) => {
  smartLog("info", "entering showreel handler");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;

  let mute = u.query.mute;
  if (!mute) mute = "MUTE";

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;
  const element = script[sceneNumber][elementNumber];
  const slug = script[sceneNumber][0].dialogue;

  let audio = "";
  if (element.sound) {
    audio = `../data/${title}/sounds/${element.sound}`;
  };

  res.render("showreel.njk", {
    sceneNumber,
    elementNumber,
    highestElement: script[sceneNumber].length - 1,
    highestScene: script.length -1,
    title,
    element,
    mute,
    slug,
    page: "Showreel",
    audio,
  });
};

module.exports = { showreelHandler };
