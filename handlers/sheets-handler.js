const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");

const sheetsHandler = async (req, res) => {
  smartLog("info", "ENTERING SHEETS HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  let sheet = u.query.sheet;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { shotList, script, sceneOrder } = filmFoxFile;

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

  res.render("sheets.njk", {
    title,
    shotList: sList,
    slugs: slugList,
    page: "Sheets",
    size: shotList.length,
    sheet: sheet,
  });
};

module.exports = { sheetsHandler };
