const url = require("url");
const { getData } = require("../services/file-service");
const { smartLog } = require("../services/smart-log");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const concatFiles = (clips, scene, title) => {
  const fNum = `00000${scene}`;
  const fileName = `s${fNum.substring(fNum.length - 5, fNum.length)}.mp3`;
  const outPath = path.join(__dirname, `../data/${title}/scenes`);
  const dirPath = path.join(__dirname, `../data/${title}/sounds`);
  const concat = ffmpeg();

  clips.forEach((clip) => { 
    concat.input(`${dirPath}/${clip}.mp3`);
  });

  concat
    .on("end", function () {
      console.log("Concatenation finished.");
    })
    .on("error", function (err) {
      console.error("Error:", err);
    })
    .mergeToFile(`${outPath}/${fileName}`, outPath);
};

const concatHandler = async (req, res) => {
  smartLog("info", "ENTERING concat HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const scene = u.query.scene;
  const ptr = u.query.ptr;

  const comp = await getData(`${title}/scenes/${title}.lst`);

  concatFiles(comp[scene], scene, title);

  setTimeout(function() {
    res.redirect(`/merge?title=${title}&ptr=${ptr}`)
  }, 10000);

};

module.exports = { concatHandler };
