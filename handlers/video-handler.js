const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData, getFileList, writeFile } = require("../services/file-service");

const createPackage = (sceneList, imageList, script) => {
  const bundle = [];

  for (let i = 0; i < sceneList.length; i++){
    bundle[i] = [sceneList[i], imageList[i]];
  }
 
  const package = [];
  for (let i = 0; i <= script[script.length - 1][2]; i++){
    package.push([]);
  };

  for (i = 0; i < sceneList.length; i++){
    package[sceneList[i]].push(imageList[i])
  };

  return package;
};

const videoHandler = async (req, res) => {
  smartLog("info", "ENTERING VIDEO HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const ptr = u.query.ptr;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  const generatedFiles = await getFileList(`data/${title}/videos`, 'mp4');

  const imageList = [];
  const sceneList = []; 
  imageList.push(script[0][5]);
  sceneList.push(script[0][2]);

  for (let i = 1; i < script.length; i++) {
    if (script[i][5] !== script[i - 1][5] || script[i][2] !== script[i - 1][2]) {
      imageList.push(script[i][5]);
      sceneList.push(script[i][2]);
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

  const gen = [];
  const top = script[script.length - 1][2];

  for (let i = 0; i <= top; i++){
    gen.push('no');
  };

  generatedFiles.forEach((g) =>{
    gen[parseInt(g.substring(0,10))] = 'yes';
  });

  const package = createPackage(sceneList, imageList, script);  
  await writeFile(JSON.stringify(package), `${title}/${title}.pack`);
  
   res.render("video.njk", {
    imageList,
    ptr,
    title,
    times,
    sceneList,
    package,
    gen,
  });
};

module.exports = { videoHandler };
