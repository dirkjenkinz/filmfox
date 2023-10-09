const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile, writeFile } = require("../services/file-service");

const updateImageDisplayHandler = async (req, res) => {
  smartLog("info", "ENTERING UPDATE IMAGE DISPLAY HANDLDER");

  let u = url.parse(req.originalUrl, true);
  const scene = u.query.scene;
  const title = u.query.title;
  const element = u.query.element;
  const image = u.query.image;
  const caller = u.query.caller;

  console.log({scene})
  console.log({element})
  console.log({image});
  console.log({caller})

  let filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;
  script[scene][element].image = image;
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  
  if (caller === "scenes") {
    res.redirect(`/scenes?title=${title}`);
  } else {
    res.redirect(
      `/display?title=${title}&scene=${scene}&element=${element}`
    );
  }
};

module.exports = { updateImageDisplayHandler };
