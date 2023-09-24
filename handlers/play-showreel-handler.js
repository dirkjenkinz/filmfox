const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData } = require("../services/file-service");

const playShowreelHandler = async (req, res) => {
  smartLog("info", "entering play showreel handler");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const current = u.query.current;
  const showreel = await getData(`${title}/${title}.shw`);

  let line = "FADE IN:";
  let scNum = 0;

  let slug = showreel[0].dialogue
  
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

  for (let i = 0; i < showreel.length; i++) {
    if (showreel[i].card.substring(showreel[i].card.length - 4) === ".mov") {
      showreel[i].imageType = "movie";
    } else if (
      showreel[i].card.substring(showreel[i].card.length - 4) === ".mp4"
    ) {
      showreel[i].imageType = "movie";
    } else {
      showreel[i].imageType = "still";
    }
  }

  res.render("play-showreel.njk", {
    title,
    showreel,
    sceneNumber,
    current,
  });
};

module.exports = { playShowreelHandler };
