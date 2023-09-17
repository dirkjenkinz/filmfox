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
console.log({clips})
  clips.forEach((clip) => {
    console.log(`${dirPath}/${clip}`)
    concat.input(`${dirPath}/${clip}`);
  });

  concat
    .on("end", function () {
      smartlog("info", "Concatenation finished.");
    })
    .on("error", function (err) {
      smartLog("error:", err);
    })
    .mergeToFile(`${dirPath}/${fileName}`, dirPath);
};

const concatHandler = async (req, res) => {
  smartLog("info", "ENTERING concat HANDLER");

clips = ['A cinematic close up.jpg ', 'darkpatio.jpg', 'egg.jpg']

concatFiles(clips, 'Satellite');
console.log('done');
};

concatHandler();
