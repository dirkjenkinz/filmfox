const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile, getFileList, writeFile } = require("../services/file-service");

const createPackage = (sceneList, imageList, script) => {
  const bundle = [];

  for (let i = 0; i < sceneList.length; i++){
    bundle[i] = [sceneList[i], imageList[i]];
  }
 
  const package = [];
  for (let i = 0; i <= script[script.length - 1].scene; i++){
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
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  const generatedFiles = await getFileList(`data/${title}/videos`, 'mp4');

  const imageList = [];
  const sceneList = []; 
  imageList.push(script[0].image);
  sceneList.push(script[0].scene);

  for (let i = 1; i < script.length; i++) {
    if (script[i].image !== script[i - 1].image || script[i].scene !== script[i - 1].scene) {
      imageList.push(script[i].image);
      sceneList.push(script[i].scene);
    }
  }

  let times = [];
  let duration = parseFloat(script[0].duration);
  for (let i = 1; i < script.length; i++) {
    if (script[i] === script[i - 1].image){
      duration += parseFloat(script[i].duration);
    }else{
      times.push(duration.toFixed(3));
      duration = parseFloat(script[i].duration);
    }
  }

  times.push(script[script.length - 1].duration);

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
  const top = script[script.length - 1].scene;

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
    page: 'Video',
  });
};

module.exports = { videoHandler };
