const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData, getFileList } = require("../services/file-service");

const videoHandler = async (req, res) => {
  smartLog("info", "ENTERING VIDEO HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const ptr = u.query.ptr;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  const generatedFiles = await getFileList(`data/${title}/videos`, 'mp4');

  let imageList = [];

  imageList.push(script[0][5]);

  for (let i = 1; i < script.length; i++) {
    if (script[i][5] !== script[i - 1][5]) {
      imageList.push(script[i][5]);
    }
  }

  let times = [];
  let duration = parseFloat(script[0][6]);
  for (let i = 1; i < script.length; i++) {
    if (script[i][5] === script[i - 1][5]){
      duration += parseFloat(script[i][6]);
    }else{
      times.push(duration.toFixed(3));
      duration = parseFloat(script[i][6]);
    }
  }

  times.push(script[script.length - 1][6]);

  for (let i = 0; i < imageList.length; i++) {
    if (imageList[i].substring(imageList[i].length - 4) === ".mov") {
      imageList[i] = [imageList[i], "movie"];
    } else if (imageList[i].substring(imageList[i].length - 4) === ".mp4") {
      imageList[i] = [imageList[i], "movie"];
    } else {
      imageList[i] = [imageList[i], "still"];
    }
  }

  for (let i = 0; i < imageList.length; i++){
    let mp4 = '0000'+i;
    mp4 = mp4.substring(mp4.length - 4)+'.mp4';
   
    if (generatedFiles.indexOf(mp4) != -1) {
      imageList[i][2] = 'yes';
    } else {
      imageList[i][2] = 'no';
    };
  };

  res.render("video.njk", {
    imageList,
    ptr,
    title,
    times,
  });
};

module.exports = { videoHandler };
