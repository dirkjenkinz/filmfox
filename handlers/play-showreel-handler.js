const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData } = require("../services/file-service");

const playShowreelHandler = async (req, res) => {
  smartLog("info", "entering play showreel handler");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const current = u.query.current;
  const showreel = await getData(`${title}/${title}.shw`);

  let slug='';
  let scNum = 0;

  showreel.forEach((s, index) => {
    if (
      s.dialogue.substring(0, 3) === "INT" ||
      s.dialogue.substring(0, 3) === "EXT"
    ) {
      scNum++;
      slug = `SCENE ${scNum}: ${s.dialogue}`;
    }
    s.slug = slug;
  });

  res.render("play-showreel.njk", {
    title,
    showreel,
    current,
  });
};

module.exports = { playShowreelHandler };