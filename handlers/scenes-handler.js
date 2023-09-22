const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData } = require("../services/file-service");

const scenesHandler = async (req, res) => {
  smartLog("info", "ENTERING SCENES HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const ptr = u.query.ptr;
  const current = u.query.current;
  const filmFoxFile = await getData(`${title}/${title}.fff`);

  const {script} = filmFoxFile;

  let sceneList = [{slug: script[0][1 ], image: script[0][5], element: 0}];

  script.forEach((s, index) => {
    if (s[0] === 'NARRATOR'){
      if (s[1].substring(0,3) === 'INT' || s[1].substring(0,3) === 'EXT'){
        sceneList.push({slug: s[1], image: s[5], element: index})
      };
    };
  });

  sceneList.forEach((s) => {
    if (s.image.substring(s.image.length - 4) === 'mpg' || 
    s.image.substring(s.image.length - 4) === '.avi' || 
    s.image.substring(s.image.length - 4) === '.mp4'){
      s.type = 'movie'
    } else {
      s.type = 'image'
    }
  });


  res.render("scenes.njk", {
    title,
    sceneList,
    ptr,
    current,
  });
};

module.exports = { scenesHandler };
