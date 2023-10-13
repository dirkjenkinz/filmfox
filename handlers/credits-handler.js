const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile, writeFile } = require("../services/file-service");

const creditsHandler = async (req, res) => {
  smartLog("info", "ENTERING CREDITS HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { credits } = filmFoxFile;

  if (!credits) {
    credits = {
      title: title,
      director: '',
      writer: '',
      producer: '',
    }
  };

  console.log({credits})

  res.render("credits.njk", {
    title,
    credits,
  });
};


module.exports = { creditsHandler };
