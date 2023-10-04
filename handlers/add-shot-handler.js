const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData, writeFile } = require("../services/file-service");

const addShotHandler = async (req, res) => {
  smartLog("info", "ENTERING ADD SHOT HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const scene = u.query.scene;
  const line = u.query.line;

  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const { shotList } = filmFoxFile;

  const shot = shotList[scene].lines;
  const newLine = {
    shot: "-",
    angle: "-",
    move: "-",
    audio: "-",
    subject: "",
    description: "",
  };

  shot.splice(parseInt(line) + 1, 0, newLine);

  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  res.redirect(`/edit-shot-list?title=${title}&scene=${scene}`);
};

module.exports = { addShotHandler };
