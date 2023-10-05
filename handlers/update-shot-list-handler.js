const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile, writeFile } = require("../services/file-service");

const updateShotListHandler = async (req, res) => {
  smartLog("info", "ENTERING UPDATE SHOTLIST HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const scene = u.query.scene;
  const val = u.query.val;
  const item = u.query.item;
  const line = u.query.line;

  console.log({item});
  console.log({val});

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const {shotList} = filmFoxFile;
  shotList[scene].lines[line][`${item}`] = val;
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  res.redirect(`/edit-shot-list?title=${title}&scene=${scene}`)

};

module.exports = { updateShotListHandler };
