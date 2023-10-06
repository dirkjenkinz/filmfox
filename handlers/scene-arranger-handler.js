const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");

const sceneArrangerHandler = async (req, res) => {
  smartLog("info", "ENTERING MASTER SHOT LIST HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  let hidden = u.query.hidden;
  const full = u.query.full;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { shotList, script, sceneOrder } = filmFoxFile;
  console.log(hidden);
  if (!hidden) {
    console.log("-1");
    hidden = [];
    for (let i = 0; i < shotList.length; i++) {
      hidden.push("false");
    }
  } else {
    hidden = hidden.split(",");
  };

  const slugs = [];
  script.forEach((s) => {
    if (s.slug === "yes") {
      slugs.push(s.dialogue);
    }
  });

  sList = [];
  slugList = [];
  sceneOrder.forEach((scene, index) => {
    sList.push(shotList[scene]);
    slugList.push(slugs[scene]);
  });

  script.forEach((s) => {
    if (s.slug === "yes") {
      slugs.push(s.dialogue);
    }
  });

  if (full === "yes") {
    res.render("full-shot-list.njk", {
      title,
      shotList: sList,
      slugs: slugList,
      page: "Full Shot List",
      size: shotList.length,
      hidden,
    });
  } else {
    res.render("scene-arranger.njk", {
      title,
      shotList: sList,
      slugs: slugList,
      page: "Scene Arranger",
      size: shotList.length,
      hidden,
    });
  }
};

module.exports = { sceneArrangerHandler };
