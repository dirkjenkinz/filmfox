const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");

const charactersHandler = async (req, res) => {
  smartLog("info", "ENTERING CHARACTERS HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const characters = await readFile(`${title}/${title}.chrs`);
  res.render("characters.njk", {
    title,
    characters,
  });
};

module.exports = { charactersHandler };
