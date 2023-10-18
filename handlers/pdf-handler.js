const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const pagesPath = path.join(__dirname, "../pages");
const outPath = path.join(__dirname, "../data");

const pdfHandler = async (req, res) => {
  smartLog("info", "ENTERING PDF HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const sheetNumber = u.query.sheetNumber;

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { shotList, script, credits } = filmFoxFile;
  const shot = shotList[sceneNumber];

  let number = "000000" + sheetNumber;
  number = number.substring(number.length - 4);

  const html = fs.readFileSync(`${pagesPath}/sheet.njk`, "utf8");

  const options = {
    format: "A4",
    orientation: "portrait",
    border: "20mm",
    footer: {
      height: "10mm",
      contents: {
        first: "First page",
        2: "Second page",
        default:
          '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
        last: "Last Page",
      },
    },
  };

  lines = shot.lines;

  let outTitle = title;

  if (credits.title ){
    outTitle = credits.title;
  };

  const document = {
    html: html,
    data: {
      title,
      outTitle,
      sheetNumber,
      shot,
      lines,
      slug: script[sceneNumber][0].dialogue,
      credits,
      realTitle: credits.title,
    },
    path: `${outPath}/${title}/sheets/sheet${number}.pdf`,
    type: "nunjucks",
  };

  pdf
    .create(document, options)
    .then((res) => {
      smartLog("info", res);
    })
    .catch((error) => {
      smartLog("error", error);
    });

    setTimeout(function () {
      res.redirect(`/sheets?title=${title}&sheet=${sheetNumber}`);
    }, 3000);
};

module.exports = { pdfHandler };
