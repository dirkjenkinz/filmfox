const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData, writeFile } = require("../services/file-service");

const deleteShotHandler = async (req, res) => {
  smartLog("info", "ENTERING DELETE SHOT HANDLER");
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

  if (shot.length > 1) {
    shot.splice(line, 1);
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  }

  res.redirect(`/edit-shot-list?title=${title}&scene=${scene}`);
};

module.exports = { deleteShotHandler };
