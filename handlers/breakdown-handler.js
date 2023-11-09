"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile, writeFile } = require("../services/file-service");

const breakdownHandler = async (req, res) => {
  smartLog("info", "ENTERING BREAKDOWN HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const element = u.query.element;
  let entity = u.query.entity;
  let action = u.query.action;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { script, elements, breakdown } = filmFoxFile;

  if (!entity) {
    action = "display";
  } else {
    entity = entity.toUpperCase().trim();
  }

  if (action === "add") {
    let elementExists = false;
    breakdown[sceneNumber].forEach((b) => {
      if (b[0] === element) {
        if (b.indexOf(entity) === -1) {
          b.push(entity);
        }
        elementExists = true;
      }
    });
    if (!elementExists) {
      breakdown[sceneNumber].push([element, entity]);
    }
  }

  if (action === "del") {
    for (let i = 0; i < breakdown[sceneNumber].length; i++) {
      if (breakdown[sceneNumber][i][0] === element) {
        let temp = [];
        for (let index = 0; index < breakdown[sceneNumber][i].length; index++) {
          if (breakdown[sceneNumber][i][index] !== entity) {
            temp.push(breakdown[sceneNumber][i][index]);
          }
        }
        breakdown[sceneNumber][i] = temp;
      }
    }
  }
  console.log(filmFoxFile.breakdown[sceneNumber]);
  console.log({ action });
  if (action !== "display") {
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  }

  const headers = [];
  breakdown[sceneNumber].forEach((b) => {
    headers.push(b[0].replace(/ /gi, "-"));
  });

  res.render("breakdown.njk", {
    title,
    sceneNumber,
    elementNumber,
    highestScene: script.length - 1,
    breakdown: breakdown[sceneNumber],
    elements,
    scene: script[sceneNumber],
    headers,
  });
};

module.exports = { breakdownHandler };
