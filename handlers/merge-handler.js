const url = require("url");
const { getData, writeFile, getFileList } = require("../services/file-service");
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

  script.forEach((m) => {
    merged.push('no');
  });

  mergedFiles.forEach((m) => {
    const num = parseInt(m.substring(1, m.length - 4));
    merged[num] = 'yes';
  });
 
  script.forEach((s) => {
    if (s[4]) {
      scenes.push([s[2], s[4]]);
    };
  });

  const top = scenes[scenes.length - 1][0] + 1;

  const comp = [];
  for (let i = 0; i < top; i++) {
    let temp = [];
    for (let j = 0; j < scenes.length; j++) {
      if (scenes[j][0] === i) {
        temp.push(scenes[j][1]);
      }
    }
    comp.push(temp);
  };

  await writeFile(JSON.stringify(comp), `${title}/scenes/${title}.lst`);

  res.render("merge.njk", {
    title,
    comp,
    merged,
  });
};

module.exports = { mergeHandler };