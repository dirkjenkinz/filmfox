const url = require("url");
const { smartLog } = require("./services/smart-log");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const concatFiles = (clips, title) => {
  const fileName = `aaaaaa.mpg`;
  const dirPath = path.join(__dirname, `./data/${title}/images`);
  const concat = ffmpeg();

  clips.forEach((clip) => {
    concat.input(`${dirPath}/${clip}`);
  });

console.log(`${dirPath}/${fileName}`)

  concat
    .on("end", function () {
      smartlog("info", "Concatenation finished.");
    })
    .on("error", function (err) {
      smartLog("error:", err);
    })
    .mergeToFile(`${dirPath}/${fileName}`, './');
};

const concatHandler = async (req, res) => {
  smartLog("info", "ENTERING concat HANDLER");

clips = ['A cinematic close up.jpg ', 'darkpatio.jpg', 'egg.jpg']

concatFiles(clips, 'Satellite');
smartLog('info','done');
};

concatHandler();