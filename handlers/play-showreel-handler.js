const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData, playSoundFile } = require("../services/file-service");

const playShowreelHandler = async (req, res) => {
  smartLog("info", "entering play showreel handler");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const ptr = u.query.ptr;
  const current = u.query.current;
  const showreel = await getData(`${title}/${title}.shw`);

  const slug = [];

  let line = 'FADE IN:'

  showreel.forEach((s) => {
    if (s.dialogue.substring(0, 3) === 'INT' || s.dialogue.substring(0, 3) === 'EXT'){
      line = s.dialogue;
    }
    slug.push(line);
  });

  const soundFile = showreel[current].sound;
  playSoundFile(title, soundFile)

  res.render("play-showreel.njk", {
    title,
    showreel,
    ptr,
    current,
    slug,
  });
};

module.exports = { playShowreelHandler };
