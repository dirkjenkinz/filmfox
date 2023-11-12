"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const {
  readFile,
  writeFile,
} = require("../services/file-service");

const breakdownReportHandler = async (req, res) => {
  smartLog("info", "ENTERING BREAKDOWN REPORT HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { script, breakdown } = filmFoxFile;

  res.render("breakdown-report.njk", {
    title,
    sceneNumber,
    elementNumber,
    highestScene: script.length - 1,
    breakdown: breakdown[sceneNumber],
    scene: script[sceneNumber],
    page: 'Breakdown Report',
    size: script.length -1,
  });
};

module.exports = { breakdownReportHandler };
