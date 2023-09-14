const url = require("url");
const { smartLog } = require('../services/smart-log');
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const concatFiles = (clips, scene, title) => {
  const fNum = `00000${scene}`;
  const fileName = `s${fNum.substring(fNum.length - 5, fNum.length)}.mp3`;
  const dirPath = path.join(__dirname, `../data/${title}/scenes`);
  const master = ffmpeg();

  clips.forEach((clip) => { 
    master.input(`${dirPath}/${clip}.mp3`);
  });

  master
    .on("end", function () {
      console.log("Concatenation finished.");
    })
    .on("error", function (err) {
      console.error("Error:", err);
    })
    .mergeToFile(`${outPath}/${fileName}`, outPath);
};

const masterHandler = async (req, res) => {
  smartLog("info", "ENTERING MASTER HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const size = u.query.size;
  const ptr = u.query.ptr;
  const dirPath = path.join(__dirname, `../data/${title}/scenes`);
  const concat = ffmpeg();
  
  for (let i = 0; i < size; i++) {
    let fName = `00000${i}`;
    fName = `s${fName.substring(fName.length - 5)}.mp3`;
    concat.input(`${dirPath}/${fName}`);
  };

  concat
    .on("end", function () {
      console.log("Concatenation finished.");
    })
    .on("error", function (err) {
      console.error("Error:", err);
    })
    .mergeToFile(`${dirPath}/master.mp3`, dirPath);

  setTimeout(function() {
    res.redirect(`/merge?title=${title}&ptr=${ptr}`)
  }, 5000);

};

module.exports = { masterHandler };
