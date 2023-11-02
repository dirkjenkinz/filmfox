"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const {
  readFile,
  writeFile,
  createDirectory,
  getFileList,
} = require("../services/file-service");

const insertElement = (doc, para, element, start, finish) => {
  let newDoc = "";
  let paragraphs = doc.split("<p");
  for (let i = 1; i < paragraphs.length; i++) {
    paragraphs[i] = "<p" + paragraphs[i];
    if (paragraphs[i].indexOf(`id='${para}'`) != -1) {
      const ptr = paragraphs[i].indexOf(">") + 1;
      start = parseInt(start) + ptr;
      finish = parseInt(finish) + ptr;
      const leftString = paragraphs[i].substring(0, start);
      const midString = `<span class='${element}'>${paragraphs[i].substring(
        start,
        finish
      )}</span>`;
      const rightString = paragraphs[i].substring(finish);
      paragraphs[i] = leftString + midString + rightString;
    }
    newDoc += paragraphs[i];
  }
  console.log({ newDoc });
  return newDoc;
};

const htmlise = (scene) => {
  let doc = "";
  scene.forEach((s, index) => {
    if (s.character !== "NARRATOR") {
      doc += `<p class='character' id='el${index}_0'>${s.character}</p>`;
    }
    doc += `<p class='speech' id='el${index}_1'>${s.dialogue}</p>`;
  });
  return doc;
};

const breakdownHandler = async (req, res) => {
  smartLog("info", "ENTERING BREAKDOWN HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const element = u.query.element;
  const start = u.query.start;
  const finish = u.query.finish;
  const para = u.query.para;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { script } = filmFoxFile;

  let doc = [];
  script[sceneNumber].forEach((s) => {
    doc.push([s.character, s.dialogue]);
  });

  await createDirectory(`${title}/breakdown`);
  let breakdownFileList = await getFileList(`data/${title}/breakdown`, "bkd");
  let bkdFile = "0000" + sceneNumber;
  bkdFile = `${bkdFile.substring(bkdFile.length - 4)}.bkd`;
  if (breakdownFileList.indexOf(bkdFile) === -1) {
    doc = htmlise(script[sceneNumber]);
    await writeFile(JSON.stringify(doc), `${title}/breakdown/${bkdFile}`);
  } else {
    doc = await readFile(`${title}/breakdown/${bkdFile}`);
  }

  if (element) {
    doc = insertElement(doc, para, element, start, finish);
  }

  res.render("breakdown.njk", {
    doc,
    title,
    sceneNumber,
    elementNumber,
    element,
    start,
    finish,
    para,
  });
};

module.exports = { breakdownHandler };
