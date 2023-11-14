const url = require('url');
const { smartLog } = require('../services/smart-log');
const { readFile } = require('../services/file-service');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const pagesPath = path.join(__dirname, '../pages');
const outPath = path.join(__dirname, '../data');

const breakdownPDFHandler = async (req, res) => {
  smartLog('info', 'ENTERING BREAKDOWN PDF HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = sceneNumber;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { breakdown, script, credits } = filmFoxFile;

  let number = '000000' + sceneNumber;
  number = number.substring(number.length - 4);

  const doc = new PDFDocument();
  doc.pipe(
    fs.createWriteStream(`${outPath}/${title}/breakdown/breakdown${number}.pdf`)
  );

  const breakLine =
    '------------------------------------------------------------------';
  const lines = [`${title}: SCENE BREAKDOWN - SCENE ${sceneNumber}`, breakLine];
  breakdown[sceneNumber].forEach((b) => {
    lines.push(b[0]);
    let elements = '';
    for (let j = 1; j < b.length; j++) {
      if (j < b.length - 1) {
        elements = elements + b[j] + ' -- ';
      } else {
        elements = elements + b[j];
      }
    }
    lines.push(elements);
    lines.push(breakLine);
  });

  doc.font('Courier-Bold').fontSize(12).text(lines[0], 60, 60);

  for (let i = 1; i < lines.length; i++) {
    doc.text(lines[i]);
  }

  doc.end();

  res.redirect(
    `/breakdown-report?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`
  );
};

module.exports = { breakdownPDFHandler };
