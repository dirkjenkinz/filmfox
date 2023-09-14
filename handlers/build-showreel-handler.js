const fs = require("fs");
const path = require("path");
const url = require("url");
const { smartLog } = require("../services/smart-log");
const { createCanvas, loadImage, registerFont } = require("canvas");
registerFont("C:/Windows/Fonts/arialbd.ttf", { family: "Arial Bold" });
registerFont("C:/Windows/Fonts/timesbd.ttf", { family: "Times Bold" });
const {
  getDuration,
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
  let title = u.query.title;
  let ptr = u.query.ptr;
  let filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  timeStart = 0.0;
  let timeFinish = 0.0;
  smartLog("info", "building showreel data");

  let t = 0.00;
  const showreel = [];
  script.forEach((s, index)=>{
    showreel.push({
      duration: s[6],
      character: s[0],
      dialogue: s[1],
      start: formatTime(t),
      finish: formatTime(t + s[6]),
      card: s[5],
      sound: `${s[4]}.mp3`,
    })
    t = t + s[6];
  });

  await writeFile(JSON.stringify(showreel), `/${title}/${title}.shw`)

  smartLog("info", "showreel complete");
  res.redirect(`/display?title=${title}&ptr=0&locked=yes&headersOnly=no&ptr=ptr`);
};

module.exports = { buildShowreelHandler };
