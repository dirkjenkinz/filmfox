const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData, writeFile } = require("../services/file-service");

const updateNoteHandler = async (req, res) => {
  smartLog("info", "ENTERING UPDATE NOTE HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const scene = u.query.scene;
  const val = u.query.val;

  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const {shotList} = filmFoxFile;
  console.log({scene})
  console.log(({val}))
  shotList[scene].note = val;

  console.log({shotList})

  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  res.redirect(`/display?title=${title}&scene=${scene}`)
};

module.exports = { updateNoteHandler };
