const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData, writeFile } = require("../services/file-service");

const shots = ["-", "WS", "VWS", "MS", "MCU", "XCU", "CU",];
const angles = [
  "Eye Level",
  "High Angle",
  "Low Angle",
  "Dutch Angle/Tilt",
  "Over The Shoulder (OTS)",
  "Birds-Eye View",
  "Point of View (POV)",
];
const moves = ['Static', 'Pan', 'Tilt', 'Dolly', 'Crane/Boom', 'Handheld', 'Zoom', 'Rack Focus']

const editShotListHandler = async (req, res) => {
  smartLog("info", "ENTERING BACK TO SCENES HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const scene = u.query.scene;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script, shotList } = filmFoxFile;

  let pointer = -1;
  script.forEach((s, index) => {
    if (s.scene === parseInt(scene) && pointer === -1) {
      pointer = index;
    }
  });

  const slug = script[pointer];

  page = {
    scene: scene,
    lines: [
      {
        shot: "WS",
        angle: "High Angle",
        move: "Swing",
        audio: "Boom",
        subject: "Apples",
        description: "Lots of notes",
      },
      {
        shot: "CU",
        angle: "Low Angle",
        move: "Swing",
        audio: "Boom",
        subject: "Apples",
        description: "Lots of notes",
      },
      {
        shot: "MCU",
        angle: "Eye Level",
        audio: "Boom",
        move: "Swing",
        subject: "Apples",
        description: "Lots of notes",
      },
    ],
  };

  shotList.forEach((s) => {
    if (s.scene === scene) {
      page = s;
    }
  });

  res.render("edit-shot-list.njk", {
    title,
    page,
    slug,
    shots,
    angles,
    moves,
  });
};

module.exports = { editShotListHandler };
