const url = require("url");
const { smartLog } = require("../services/smart-log");
const { readFile, writeFile } = require("../services/file-service");

const formatLine2 = (scene, note) => {
  const noteArray = note.split(' ');
  let lines = []
  let ptr = 0;
  lines[ptr] = '';
  noteArray.forEach((word) => {
    lines[ptr] += word + ' ';
    if (lines[ptr].length > 20) {
      ptr ++;
      lines[ptr] = '';
    };
    let box = '';
  });
  console.log(line);
};

const printHandler = async (req, res) => {
  smartLog("info", "ENTERING PRINT HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const sheetNumber = u.query.sheetNumber;

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { shotList } = filmFoxFile;
  const shot = shotList[sceneNumber];

  let bars =
    "*------------------------------------------------------------------------------*";
  let output = `${bars}\n`;

  let line1 = `| SHEET # ${sheetNumber}  | ${title}`;
  let line1a = "                                                                                 ";
  line1a = line1a.substring(0, 79 - line1.length) + "|\n";
  line1 += line1a;
  output += line1;
  output += `${bars}\n`;
  output += formatLine2(sceneNumber, shot.note)
  output += `${bars}\n`;

  console.log(output);

  //console.log({ shot });

  //  shot.splice(parseInt(line) + 1, 0, newLine);
  //  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  //  res.redirect(`/scene-shot-list?title=${title}&scene=${scene}`);
};

module.exports = { printHandler };
