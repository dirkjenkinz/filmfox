"use strict";
const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");

const sceneArrangerHandler = async (req, res) => {
  smartLog("info", "ENTERING SCENE ARRANGER HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  let hidden = u.query.hidden;
  const full = u.query.full;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { shotList, script, sceneOrder, credits } = filmFoxFile;
  if (!hidden) {
    hidden = [];
    for (let i = 0; i < shotList.length; i++) {
      hidden.push("false");
    }
  } else {
    hidden = hidden.split(",");
  }

  const slugs = [];
  script.forEach((s) => {
    slugs.push(s[0].dialogue);
  });

  const sList = [];
  const slugList = [];
  sceneOrder.forEach((sceneNumber, index) => {
    sList.push(shotList[sceneNumber]);
    slugList.push(slugs[sceneNumber]);
  });

  if (full === "yes") {
    res.render("full-shot-list.njk", {
      title,
      shotList: sList,
      slugList,
      page: "Full Shot List",
      size: shotList.length,
      hidden,
      realTitle: credits.title,
    });
  } else {
    res.render("scene-arranger.njk", {
      title,
      shotList: sList,
      slugList,
      page: "Scene Arranger",
      size: shotList.length,
      hidden,
    });
  }
};

module.exports = { sceneArrangerHandler };
