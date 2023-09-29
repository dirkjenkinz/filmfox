const fs = require("fs");
const path = require("path");
const url = require("url");
const { smartLog } = require("../services/smart-log");
const { createCanvas, loadImage, registerFont } = require("canvas");
registerFont("C:/Windows/Fonts/arialbd.ttf", { family: "Arial Bold" });
registerFont("C:/Windows/Fonts/timesbd.ttf", { family: "Times Bold" });
const {
  getData,
  writeFile,
} = require("../services/file-service");

const formatTime = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  let h = date.toISOString();
  h = h.substring(11, h.length - 5);
  let micro = seconds - Math.floor(seconds);
  micro = micro.toString().substring(2, 5);
  if (!micro) micro = "000";
  h = `${h},${micro}`;
  return h;
};

const buildShowreelHandler = async (req, res) => {
  smartLog("info", "entering build showreel handler");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  timeStart = 0.0;
  smartLog("info", "BUILDING SHOWREEL");

  let t = 0.00;
  const showreel = [];
  script.forEach((s)=>{
    showreel.push({
      duration: s.duration,
      character: s.character,
      dialogue: s.dialogue,
      start: formatTime(t),
      finish: formatTime(t + s.duration),
      image: s.image,
      sound: `../data/${title}/sounds/${s.sound}`,
      type: s.type
    })
    t = t + s.duration;
  });

  await writeFile(JSON.stringify(showreel), `/${title}/${title}.shw`)
  smartLog("info", "showreel built");
  res.redirect(`/play-showreel?title=${title}&current=0`);
};

module.exports = { buildShowreelHandler };
