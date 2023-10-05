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
    if (s.slug === "yes") {
      sceneList.push({
        slug: s.dialogue,
        image: s.image,
        element: index,
        note: shotList[s.scene].note,
        type: s.type,
      });
    }
  });

  res.render("scenes.njk", {
    title,
    sceneList,
  });
};

module.exports = { scenesHandler };
