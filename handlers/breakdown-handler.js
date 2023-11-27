'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, writeFile } = require('../services/file-service');

const breakdownHandler = async (req, res) => {
  smartLog('info', 'ENTERING BREAKDOWN HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const element = u.query.element;
  const hidden = u.query.hidden;
  let entity = u.query.entity;
  let action = u.query.action;
  let scr1 = u.query.scr1;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  let { script, breakdown } = filmFoxFile;

  const categories = [];

  breakdown[0].forEach((c) => {
    categories.push(c[0]);
  });

  if (!entity) {
    action = 'display';
  } else {
    entity = entity.toUpperCase().trim();
  }

  if (action === 'add') {
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

  if (action === 'del') {
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
  if (action !== 'display') {
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  }

  const headers = [];
  breakdown[sceneNumber].forEach((b) => {
    if (b !== null) {
      headers.push(b[0].replace(/ /gi, '-'));
    };
  });

  if (!hidden) {
    let h = '';
    breakdown.forEach(() => {
      h = h + 'r';
    });
  };

  if (!scr1) scr1 = 0;

  let elementNames = [];
  breakdown[sceneNumber].forEach((b) => {
    elementNames.push(b[0].replace(/ /gi, '-'));
  });

  console.log({ elementNames });

  res.render('breakdown.njk', {
    title,
    sceneNumber,
    elementNumber,
    highestScene: script.length - 1,
    breakdown: breakdown[sceneNumber],
    categories,
    scene: script[sceneNumber],
    headers,
    hidden,
    scr1,
    page: 'Scene Breakdown',
    elementNames,
  });
};

module.exports = { breakdownHandler };
