const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");

const playShowreelHandler = async (req, res) => {
  smartLog("info", "entering play showreel handler");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  let current = u.query.current;
  const action = u.query.action;
  let mute = u.query.mute;
  const showreel = await readFile(`${title}/${title}.shw`);

  if (!mute) mute = 'MUTE';

  if (action === "nextScene") {
    let cur = -1;
   const s = showreel[current].scene + 1;
    for (let i = current; i < showreel.length; i++){
      if (showreel[i].scene === s && cur === -1){
        cur = i;
      }
    }
    current = cur;
  }

  if (action === "previousScene") {
    let cur = -1;
   const s = showreel[current].scene - 1;
    for (let i = 0; i < current; i++){
      if (showreel[i].scene === s && cur === -1){
        cur = i;
      }
    }
    current = cur;
  }

  let slug = title;
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

  scene = showreel[current].scene;

  res.render("play-showreel.njk", {
    title,
    showreel,
    current,
    scene,
    highestscene: scNum,
    mute,
    page: 'Showreel',
  });
};

module.exports = { playShowreelHandler };
