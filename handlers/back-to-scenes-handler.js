const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData, writeFile } = require("../services/file-service");

const backToScenesHandler = async (req, res) => {
  smartLog("info", "ENTERING BACK TO SCENES HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const note = u.query.note;
  const scene = u.query.scene;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const {script} = filmFoxFile;

  script.forEach((s)=> {
    if (s.scene === parseInt(scene) && s.slug === 'yes'){
      s.note = note;
    }
  });

  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  res.redirect(`/scenes?title=${title}`);
};

module.exports = { backToScenesHandler };
