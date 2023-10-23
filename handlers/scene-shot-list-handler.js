"use strict";
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

const sceneShotListHandler = async (req, res) => {
  smartLog("info", "ENTERING SCENE SHOT LIST HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { script, shotList, charactersByScene } = filmFoxFile;

  const size = shotList.length - 1;
  const slug = script[sceneNumber][0].dialogue;

  res.render("scene-shot-list.njk", {
    title,
    sceneNumber,
    lines: shotList[sceneNumber].lines,
    shots,
    angles,
    moves,
    audio,
    note: shotList[sceneNumber].note,
    slug,
    page: "Scene Shot List",
    size,
    characterList: charactersByScene[sceneNumber],
  });
};

module.exports = { sceneShotListHandler };
