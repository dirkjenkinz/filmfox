const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getListOfImages, getData, writeFile } = require("../services/file-service");

const getUsed = (script) => {
  const used = [];
  script.forEach((s) => {
    used.push(s.image);
  });
  const unique = [...new Set(used)];
  return unique;
};

const galleryHandler = async (req, res) => {
  smartLog("info", "ENTERING GALLERY HANDLER");
  let u = url.parse(req.originalUrl, true);
  const scene = u.query.scene;
  const title = u.query.title;
  const element = u.query.element;
  const caller = u.query.caller;
  const note = u.query.note;
  const imageList = await getListOfImages(title);
  imageList.unshift("blank.jpg");

if (caller === 'edit-scene'){
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script } = filmFoxFile;
  script[element].note = note;
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
};

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

  images.forEach((i, index) => {
    if (usedImages.indexOf(i[0]) !== -1) {
      used.push(i);
    } else {
      unused.push(i);
    };
  });

  res.render("gallery.njk", {
    title,
    element,
    scene,
    used,
    unused,
    caller,
  });
};

module.exports = { galleryHandler };
