const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile, writeFile } = require("../services/file-service");

const masterShotListHandler = async (req, res) => {
  smartLog("info", "ENTERING MASTER SHOT LIST HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  let hidden = u.query.hidden;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { shotList, script, sceneOrder } = filmFoxFile;

  if (!hidden) {
    hidden = [];
    for (let i = 0; i < shotList.length; i++) {
      hidden.push('false');
    }
  }

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

  hidden = hidden.split(',');

  res.render("master-shot-list.njk", {
    title,
    shotList: sList,
    slugs: slugList,
    page: "Master Shot List",
    size: shotList.length,
    hidden,
  });
};

module.exports = { masterShotListHandler };
