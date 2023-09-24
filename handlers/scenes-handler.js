const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData } = require("../services/file-service");

const scenesHandler = async (req, res) => {
  smartLog("info", "ENTERING SCENES HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const current = u.query.current;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const {script} = filmFoxFile;
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
    sceneNumber,
    current,
  });
};

module.exports = { scenesHandler };
