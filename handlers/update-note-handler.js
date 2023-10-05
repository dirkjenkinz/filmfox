const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile, writeFile } = require("../services/file-service");

const updateNoteHandler = async (req, res) => {
  smartLog("info", "ENTERING UPDATE NOTE HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const scene = u.query.scene;
  const val = u.query.val;
  const caller = u.query.caller;

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const {shotList} = filmFoxFile;
  shotList[scene].note = val;

  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
console.log({caller})
  if (caller === 'scenes'){
    console.log('1')
    res.redirect(`/scenes?title=${title}`)
  } else {
    console.log('2')
    res.redirect(`/display?title=${title}&scene=${scene}`)
  }
};

module.exports = { updateNoteHandler };
