"use strict";
const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");

const scenesHandler = async (req, res) => {
  smartLog("info", "ENTERING SCENES HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { script, shotList } = filmFoxFile;
  let sceneList = [];

  script.forEach((s, index) => {
      sceneList.push({
        slug: s[0].dialogue,
        image: s[0].image,
        element: index,
        note: shotList[s[0].scene].note,
        type: s[0].type,
      });
  });

  res.render("scenes.njk", {
    title,
    sceneList,
    page: 'Scenes',
  });
};

module.exports = { scenesHandler };
