const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getListOfImages } = require("../services/file-service");

const galleryHandler = async (req, res) => {
  smartLog("info", "entering gallery handler");

  let u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  const title = u.query.title;
  const img = u.query.img;
  const imageList = await getListOfImages(title);
  imageList.unshift("blank.jpg");

  const imageType = [];
  for (let i = 0; i < imageList.length; i++) {
    if (imageList[i].substring(imageList[i].length - 4) === ".mov") {
      imageType.push("movie");
    } else if (imageList[i].substring(imageList[i].length - 4) === ".mp4") {
      imageType.push("movie");
    } else {
      imageType.push("still");
    }
  }

  res.render("gallery.njk", {
    title,
    img,
    ptr,
    imageList,
    imageType,
  });
};

module.exports = { galleryHandler };
