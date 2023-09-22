const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getListOfImages } = require("../services/file-service");
const {getData} = require('../services/file-service');

const getUsed = (script) => {
  const used = [];
  script.forEach((s) => {
    used.push(s[5]);
  });
  const unique = [...new Set(used)];
  return unique;
};

const galleryHandler = async (req, res) => {
  smartLog("info", "ENTERING GALLERY HANDLER");
  let u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  const title = u.query.title;
  const element = u.query.element;
  const scene = u.query.scene;
  const caller = u.query.caller;
  const imageList = await getListOfImages(title);
  imageList.unshift("blank.jpg");

  const images = [];
  for (let i = 0; i < imageList.length; i++) {
    if (imageList[i].substring(imageList[i].length - 4) === ".mov") {
      images.push([imageList[i], "movie"]);
    } else if (imageList[i].substring(imageList[i].length - 4) === ".mp4") {
      images.push([imageList[i], "movie"]);
    } else {
      images.push([imageList[i], "still"]);
    }
  };


  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const {script} = filmFoxFile;
  const usedImages = getUsed(script);

  const used = [];
  const unused = [];

  images.forEach((i) => {
    if (usedImages.indexOf(i[0]) !== -1) {
      used.push(i);
    } else {
      unused.push(i);
    };
  });

  res.render("gallery.njk", {
    title,
    element,
    ptr,
    used,
    unused,
    caller,
    scene,
  });
};

module.exports = { galleryHandler };
