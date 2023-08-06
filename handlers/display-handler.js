const url = require("url");
const {
  getData,
  getListOfElements,
} = require("../services/file-service");
const { smartLog } = require("../services/smart-log");
const dotenv = require("dotenv");
dotenv.config();

const displayHandler = async (req, res) => {
  smartLog("info", "ENTERING DISPLAY HANDLER");

  let u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file);

  const { title, script } = filmFoxFile;
  const chrs = file.substring(0, file.length - 4) + ".chrs";
  const characters = await getData(chrs);
  const api_key = process.env.APIKEY;
  const offset = filmFoxFile.offset;

  script.forEach((scriptChar) => {
    characters.forEach((c) => {
      if (c[0] === scriptChar[0]) {
        scriptChar[3] = c[1];
      }
    });
  });

  ptr = parseInt(ptr);

  const end = script.length - 10;
  if (ptr > end) ptr = end;
  if (ptr < 0) ptr = 0;

  const elements = await getListOfElements(title);
  elements.forEach((e, index) => {
    e = e.substring(6);
    e = e.substring(0, 6);
    elements[index] = parseInt(e);
  });

  script.forEach((s) => {
    s.push("");
  });

  const elementNames = await getListOfElements(title);

  script.forEach((s) => {
    s[4] = "";
  });

  elementNames.forEach((name) => {
    const num = parseInt(name.substring(6, 12));
    script[num][4] = name.substring(0, name.length - 4);
  });

  /*
  let timeStart = `${offset}.000`;
  timeStart = parseFloat(timeStart);
  let timeFinish = 0.0;
  smartLog("info", "building srt data");
  for (const element of elementNames) {
    const duration = await procureDuration(file, element);
    let num = element.substring(6, 12);
    num = parseInt(num);

    timeFinish = timeStart + duration;
    timeFinish = Math.round(timeFinish * 1000) / 1000;

    let formattedStart = formatTime(timeStart);

    script[num].push(formattedStart);
    script[num].push(formatTime(duration));
    script[num].push(formatTime(timeFinish));

    timeStart = timeFinish + 0.5;
    timeStart = Math.round(timeStart * 1000) / 1000;
  }

  let srt = "";
  for (let s = 0; s < script.length; s++) {
    if (script[s][6]) {
      const text = script[s][1].trim();
      srt += `${s + 1}\n`;
      srt += `${script[s][6]} --> ${script[s][8]}\n`;
      srt += `${script[s][0]}: ${text}\n\n`;
    }
  }

  await writeFile(srt, `${title}.srt`);

  smartLog("info", "srt complete");
*/
  res.render("display.njk", {
    title,
    api_key,
    script,
    ptr,
    end,
    offset,
  });
};

module.exports = { displayHandler };
