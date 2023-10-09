const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");
const videoshow = require("videoshow");
const path = require("path");
const FFmpeg = require("fluent-ffmpeg");
const fs = require("fs");

const imgToMP4 = (caption, sound, vision, duration, output) => {
  smartLog("info", `Converting ${vision}`);
  const images = [vision];

  const videoOptions = {
    fps: 25,
    loop: duration, // seconds
    caption: caption,
    captionDelay: 0,
    captionStart: 0,
    captionEnd: 0,
    transition: false,
    videoBitrate: 1024,
    videoCodec: "libx264",
    size: "640x?",
    audioBitrate: "128k",
    audioChannels: 2,
    format: "mp4",
    pixelFormat: "yuv420p",
  };

  videoshow([
    {
      path: vision,
    },
  ])
    .audio(sound)
    .save(output)
    .on("start", function (command) {
      smartLog("info", `ffmpeg process started: ${vision}`);
    })
    .on("error", function (err, stdout, stderr) {
      smartLog("error", err);
    })
    .on("end", function (output) {
      smartLog("info", `Video created: ${output}`);
    });
};

const createVideoHandler = async (req, res) => {
  smartLog("info", "ENTERING CREATE VIDEO HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const scene = u.query.scene;
  const soundPath = path.join(__dirname, `../data/${title}/sounds`);
  const imagePath = path.join(__dirname, `../data/${title}/images`);
  const outPath = path.join(__dirname, `../data/${title}/videos`);

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;
  script.forEach((s, index) => {
    if (s.scene == parseInt(scene)) {
      let num = "0000" + scene;
      num = num.substring(num.length - 4);
      let sub = "0000" + index;
      sub = sub.substring(sub.length - 4);
      const caption = `${s.character}: ${s.dialogue}`
      const sound = `${soundPath}/${s.sound}`;
      const vision = `${imagePath}/${s.image}`;
      let duration = Math.ceil(s.duration) + 1;
      if (duration < 4 ) duration = 4;
      const output = `${outPath}/${num}_${sub}.mp4`
      if (s.type === "movie") {
        new FFmpeg()
        .addInput(vision)
        .addInput(sound)
        .save(output);
      } else {
        imgToMP4(caption, sound, vision, duration, output);
      }
    }
  });

  res.redirect(`/video?title=${title}&scene=${scene}`);
};

module.exports = { createVideoHandler };
