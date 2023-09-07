const url = require("url");
const { smartLog } = require("../services/smart-log");

const runShowreelHandler = async (req, res) => {
  smartLog("info", "entering run showreel handler");
  const u = url.parse(req.originalUrl, true);
  let title = u.query.title;
  let ptr = u.query.ptr;
  const showreel = await getData(`${title}.shw`);
  res.render("run-showreel.njk", {
    title,
    showreel,
    ptr,
  });
};

module.exports = { runShowreelHandler };
