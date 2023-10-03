const url = require("url");
const { smartLog } = require("../services/smart-log");
const { deleteFile, getData, writeFile } = require("../services/file-service");

const deleteHandler = async (req, res) => {
  smartLog("info", "entering delete handler");
  const u = url.parse(req.originalUrl, true);
  const scene = u.query.scene;
  const element = u.query.element;
  const title = u.query.title;
  const sub = u.query.sub;
  const num = u.query.num;
  await deleteFile(title, element, sub);

  if (sub === "sounds") {
    const filmFoxFile = await getData(`${title}/${title}.fff`);
    let { script } = filmFoxFile;
    script[num].sound = "";
    script[num].duration = 0.000;
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  }

  if (sub === "sounds") {
    res.redirect(`/display?title=${title}&scene=${scene}`);
  } else {
    res.redirect(`/merge?title=${title}&scene=${scene}`);
  }
};

module.exports = { deleteHandler };
