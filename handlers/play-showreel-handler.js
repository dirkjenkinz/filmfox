const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData, playSoundFile } = require("../services/file-service");

const playShowreelHandler = async (req, res) => {
  smartLog("info", "entering play showreel handler");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const ptr = u.query.ptr;
  const muted = u.query.muted;
  const current = u.query.current;
  const showreel = await getData(`${title}/${title}.shw`);

  const slug = [];

  let line = "FADE IN:";
  let sceneNumber = 0;

  showreel.forEach((s) => {
    if (
      s.dialogue.substring(0, 3) === "INT" ||
      s.dialogue.substring(0, 3) === "EXT"
    ) {
      sceneNumber++;
      line = `SCENE ${sceneNumber}: ${s.dialogue}`;
    }
    slug.push(line);
  });

  let imageType = [];
  for (let i = 0; i < showreel.length; i++) {
    if (showreel[i].card.substring(showreel[i].card.length - 4) === ".mov") {
      imageType.push("movie");
    } else if (showreel[i].card.substring(showreel[i].card.length - 4) === ".mp4") {
      imageType.push("movie");
    } else {
      imageType.push("still");
    }
  }

  const soundFile = showreel[current].sound;

  if (muted === "no") {
    playSoundFile(title, soundFile, 'sounds');
  }

  res.render("play-showreel.njk", {
    title,
    showreel,
    ptr,
    current,
    slug,
    muted,
    imageType,
  });
};

module.exports = { playShowreelHandler };
