const url = require("url");
const path = require("path");
const { getData } = require("../services/file-service");
const { smartLog } = require("../services/smart-log");
const dotenv = require("dotenv");
dotenv.config();

const convertToMilliseconds = (t) => {
  const t2 = t.split(":");
  const t3 = t2[2].split(",");
  const hours = parseInt(t2[0] * 3600000);
  const minutes = parseInt(t2[1] * 60000);
  const seconds = parseInt(t3[0] * 1000);
  const milliseconds = parseInt(t3[1]);
  let m = hours + minutes + seconds;
  m = m + milliseconds;
  return m;
};

const videoHandler = async (req, res) => {
  smartLog("info", "ENTERING VIDEO HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const ptr = u.query.ptr;
  const videoshow = require('videoshow')

  const inPath = path.join(__dirname, `../data/${title}/images`);
  const outPath = path.join(__dirname, `../data/${title}`);

  const showreel = await getData(`${title}/${title}.shw`);

  const images = [];
  showreel.forEach((s, index) => {
    if (index < 10){
    let startMil = convertToMilliseconds(s.start);
    let endMil = convertToMilliseconds(s.finish);
    images.push({ path: `${inPath}/${s.card}`, loop: endMil - startMil });
    };
  });

  var videoOptions = {
    fps: 24,
    transition: false,
    videoBitrate: 1024,
    videoCodec: "libx264",
    size: "1600x900",
    outputOptions: ["-pix_fmt yuv420p"],
    format: "mp4",
  };

  videoshow(images, videoOptions)
    .save(`${outPath}/${title}.mp4`)
    .on("start", function (command) {
      console.log("encoding " + finalVideoPath + " with command " + command);
    })
    .on("error", function (err, stdout, stderr) {
      console.log(err)
      return Promise.reject(new Error(err));
    })
    .on("end", function (output) {
      console.log("DONE!!!!");
    });
};

module.exports = { videoHandler };
