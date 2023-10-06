const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");

const shots = ["-", "WS", "VWS", "MS", "MCU", "XCU", "CU"];
const angles = [
  "-",
  "Eye Level",
  "High Angle",
  "Low Angle",
  "Dutch Angle/Tilt",
  "Over The Shoulder (OTS)",
  "Birds-Eye View",
  "Point of View (POV)",
];
const moves = [
  "-",
  "Static",
  "Pan",
  "Tilt",
  "Dolly",
  "Crane/Boom",
  "Handheld",
  "Zoom",
  "Rack Focus",
];
const audio = ["-", "Boom", "Lavs", "Lavs and Boom", "Voice Over (VO)"];
const editShotListHandler = async (req, res) => {
  smartLog("info", "ENTERING BACK TO SCENES HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const scene = u.query.scene;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { script, shotList } = filmFoxFile;

  const size = shotList.length;

  let pointer = -1;
  script.forEach((s, index) => {
    if (s.scene === parseInt(scene) && pointer === -1) {
      pointer = index;
    }
  });

  const slug = script[pointer].dialogue;

  res.render("edit-shot-list.njk", {
    title,
    scene,
    lines: shotList[scene].lines,
    shots,
    angles,
    moves,
    audio,
    note: shotList[scene].note,
    slug,
    page: 'Edit Shot List',
    size,
  });
};

module.exports = { editShotListHandler };
