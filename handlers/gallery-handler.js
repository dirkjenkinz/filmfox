"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const {
  getListOfImages,
  readFile,
} = require("../services/file-service");

const getUsed = (script) => {
  const used = [];
  script.forEach((scene) => {
    scene.forEach((s) => {
      used.push(s.image);
    });
  });
  const unique = [...new Set(used)];
  return unique;
};

const galleryHandler = async (req, res) => {
  smartLog("info", "ENTERING GALLERY HANDLER");
  let u = url.parse(req.originalUrl, true);
  const sceneNumber = u.query.sceneNumber;
  const title = u.query.title;
  const elementNumber = u.query.elementNumber;
  const caller = u.query.caller;
  const imageList = await getListOfImages(title);
  imageList.unshift("blank.jpg");

  const images = [];
  for (let i = 0; i < imageList.length; i++) {
    if (imageList[i].substring(imageList[i].length - 4) === ".mov") {
      images.push([imageList[i], "movie"]);
    } else if (imageList[i].substring(imageList[i].length - 4) === ".mp4") {
      images.push([imageList[i], "movie"]);
    } else if (imageList[i].substring(imageList[i].length - 4) === ".avi") {
      images.push([imageList[i], "movie"]);
    } else if (imageList[i].substring(imageList[i].length - 4) === ".wmv") {
      images.push([imageList[i], "movie"]);
    } else if (imageList[i].substring(imageList[i].length - 4) === ".mkv") {
      images.push([imageList[i], "movie"]);
    } else {
      images.push([imageList[i], "still"]);
    }
  }

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;
  const usedImages = getUsed(script);
  const used = [];
  const unused = [];

  images.forEach((i, index) => {
    if (usedImages.indexOf(i[0]) !== -1) {
      used.push(i);
    } else {
      unused.push(i);
    }
  });
  
  res.render("gallery.njk", {
    title,
    elementNumber,
    sceneNumber,
    used,
    unused,
    caller,
    page: "Gallery",
  });
};

module.exports = { galleryHandler };
