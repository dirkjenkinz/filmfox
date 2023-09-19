const url = require("url");
const { smartLog } = require("../services/smart-log");
const videoshow = require("videoshow");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

const imgToMP4 = (img, dur, num, inPath, outPath) => {
  smartLog("info",`Converting ${img}`);
  console.log({img})
  dur = Math.ceil(dur);
  num = "0000" + num;
  num = num.substring(num.length - 4);

  const images = [`${inPath}/${img}`];

  const videoOptions = {
    fps: 25,
    loop: dur, // seconds
    videoBitrate: 1024,
    videoCodec: "libx264",
    size: "1200x?",
    audioBitrate: "128k",
    audioChannels: 2,
    format: "mp4",
    pixelFormat: "yuv420p",
  };

  videoshow(images, videoOptions)
    .save(`${outPath}/${num}.mp4`)
    .on("start", function (command) {
      smartLog("info", "ffmpeg process started:", command);
    })
    .on("error", function (err, stdout, stderr) {
      smartLog("error", err);
      smartLog("error", `ffmpeg stderr: ${stderr}`);
    })
    .on("end", function (output) {
      smartLog("info", `Video created in: ${output}`);
    });
};

const createVideoHandler = async (req, res) => {
  smartLog("info", "ENTERING CREATE VIDEO HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const ptr = u.query.ptr;
  const img = u.query.img;
  let dur = u.query.dur;
  let num = u.query.num;
  const inPath = path.join(__dirname, `../data/${title}/images`);
  const outPath = path.join(__dirname, `../data/${title}/videos`);
console.log({num});
  if (
    img.substring(img.length - 4) === ".mov" ||
    img.substring(img.length - 4) === ".mpg" ||
    img.substring(img.length - 4) === ".avi" ||
    img.substring(img.length - 4) === ".mp4"
  ) {
    console.log('1')
    num = "0000" + num;
    num = num.substring(num.length - 4);
    fs.copyFile(`${inPath}/${img}`, `${outPath}/${num}.mp4`, (err) => {
      if (err) throw err;
      smartLog("info", "File was copied to destination");
    });
  } else {
    console.log('2');
    imgToMP4(img, dur, num, inPath, outPath);
  }

  res.redirect(`/video?title=${title}&ptr=${ptr}`);
};

module.exports = { createVideoHandler };
