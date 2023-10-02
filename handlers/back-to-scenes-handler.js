const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData, writeFile } = require("../services/file-service");

const backToScenesHandler = async (req, res) => {
  smartLog("info", "ENTERING BACK TO SCENES HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const note = u.query.note;
  const scene = u.query.scene;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const {script} = filmFoxFile;

  script.forEach((s)=> {
    if (s.scene === parseInt(scene) && s.slug === 'yes'){
      s.note = note;
    }
  });

  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  let sceneList = [{slug: script[0].dialogue, image: script[0].image, element: 0}];

  script.forEach((s, index) => {
    if (s.character === 'NARRATOR'){
      if (s.dialogue.substring(0,3) === 'INT' || s.dialogue.substring(0,3) === 'EXT'){
        sceneList.push({slug: s.dialogue, image: s.image, element: index})
      };
    };
  });

  sceneList.forEach((s) => {
    if (s.image.substring(s.image.length - 4) === 'mpg' ||
    s.image.substring(s.image.length - 4) === '.avi' ||
    s.image.substring(s.image.length - 4) === '.mov' || 
    s.image.substring(s.image.length - 4) === '.mp4'){
      s.type = 'movie'
    } else {
      s.type = 'image'
    }
  });

  res.render("scenes.njk", {
    title,
    sceneList,
    current: scene,
  });
};

module.exports = { backToScenesHandler };
