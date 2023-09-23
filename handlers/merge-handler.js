const url = require("url");
const path = require('path');
const { getData, writeFile, getFileList, fileExists } = require("../services/file-service");
const { smartLog } = require("../services/smart-log");
const dotenv = require("dotenv");
dotenv.config();

const mergeHandler = async (req, res) => {
  smartLog("info", "ENTERING MERGE HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const mergedFiles = await getFileList(`data/${title}/scenes`, 'mp3');
  const scenes = [];
  const merged = [];
  const { script } = filmFoxFile;

  const last = script[script.length -1].scene;

  for (let i = 0; i <= last; i++){
    merged.push('no');
  };

  mergedFiles.forEach((m) => {
    const num = parseInt(m.substring(1, m.length - 4));
    merged[num] = 'yes';
  });

  let ready = 'yes';
  merged.forEach((m)=> {
    if (m === 'no') {
      ready = 'no';
    };
  });
 
  script.forEach((s) => {
    if (s.sound) {
      scenes.push([s.scene, s.sound]);
    };
  });

  const top = scenes[scenes.length - 1].character + 1;

  const comp = [];
  for (let i = 0; i < top; i++) {
    let temp = [];
    for (let j = 0; j < scenes.length; j++) {
      if (scenes[j].character === i) {
        temp.push(scenes[j].dialogue);
      };
    };
    comp.push(temp);
  };

  await writeFile(JSON.stringify(comp), `${title}/scenes/${title}.lst`);

  const dirPath = path.join(__dirname, `../data/`);

  let masterExists;
  const m = await fileExists(`${dirPath}/${title}/scenes/master.mp3`);
  
  if (m){
    masterExists = 'yes';
  } else {
    masterExists = 'no';
  };

  res.render("merge.njk", {
    title,
    comp,
    merged,
    ready,
    masterExists,
  });
};

module.exports = { mergeHandler };