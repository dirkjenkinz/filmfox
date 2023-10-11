const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile } = require("../services/file-service");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const pagesPath = path.join(__dirname, "../pages");
const outPath = path.join(__dirname, '../data');


const printHandler = async (req, res) => {
  smartLog("info", "ENTERING PRINT HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const sheetNumber = u.query.sheetNumber;

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { shotList } = filmFoxFile;
  const shot = shotList[sceneNumber];

  let number = '000000' + sheetNumber;
  number = number.substring(number.length - 4);

  const html = fs.readFileSync(`${pagesPath}/sheet.njk`, "utf8");

  const options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    footer: {
      height: "28mm",
      contents: {
        first: "Cover page",
        2: "Second page", // Any page number is working. 1-based index
        default:
          '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        last: "Last Page",
      },
    },
  };

const list = '<table style="font-size: 300%;"><thead><tr><th>Gruttox</th></tr></thead></table>';

// lines = shot.lines,

var users = [
  {
    name: "Shyam",
    age: "26",
  },
  {
    name: "Navjot",
    age: "26",
  },
  {
    name: "Vitthal",
    age: "26",
  },
];

lines = shot.lines;

  const document = {
    html: html,
    data: {
      title,
      sheetNumber,
      shot,
      lines,
    }, 
    path: `${outPath}/${title}/sheets/sheet${number}.pdf`,
    type: "nunjucks",
  };

  pdf
    .create(document, options)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });

  res.redirect(`/sheets?title=${title}&sheet=${sheetNumber}`);
};

module.exports = { printHandler };
