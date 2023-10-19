"use strict";
const url = require("url");
const { readFile, getFileList } = require("../services/file-service");
const { smartLog } = require("../services/smart-log");
const dotenv = require("dotenv");
dotenv.config();

const soundHandler = async (req, res) => {
  smartLog("info", "ENTERING SOUND HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
 const {script} = filmFoxFile;
  const mergedList = await getFileList(`data/${title}/scenes`, 'mp3');

  let masterExists = 'no';

  if (mergedList[0] === 'master.mp3'){
    masterExists = 'yes';
  };

  const merged = [];

  script.forEach((s, index) => {
    let template = `000000${index}`;
    template = template.substring(template.length - 5);
    template = `s${template}.mp3`
    if (mergedList.indexOf(template) > -1){
      merged.push('yes');
    } else {
      merged.push('no');
    }
  });

  res.render("sound.njk", {
    title,
    merged,
    script,
    masterExists,
    page: 'Sound',
    size: script.length,
  });
};

module.exports = { soundHandler };