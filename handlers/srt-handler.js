const url = require("url");
const { smartLog } = require("../services/smart-log");
const {
  getDuration,
  getListOfElements,
  getData,
  writeFile,
} = require("../services/file-service");

const formatTime = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  let h = date.toISOString();
  h = h.substring(11, h.length - 5);
  let micro = seconds - Math.floor(seconds);
  micro = micro.toString().substring(2, 5);
  if (!micro) micro = "000";
  h = `${h},${micro}`;
  return h;
};

const procureDuration = async (file, elementName) => {
  let duration = await getDuration(file, elementName);
  return duration;
};

const srtHandler = async (req, res) => {
  smartLog("info", "entering srt handler");
  const u = url.parse(req.originalUrl, true);
  let title = u.query.title;
  let ptr = u.query.ptr;
  let filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  timeStart = 0.0;
  let timeFinish = 0.0;
  smartLog("info", "building srt data");
  const elementNames = await getListOfElements(title);
  for (const element of elementNames) {
    const duration = await procureDuration(title, element);
    let num = element.substring(6, 12);
    num = parseInt(num);

    timeFinish = timeStart + duration;
    timeFinish = Math.round(timeFinish * 1000) / 1000;

    let formattedStart = formatTime(timeStart);

    script[num].push(formattedStart);
    script[num].push(formatTime(duration));
    script[num].push(formatTime(timeFinish));

    timeStart = timeFinish;
    timeStart = Math.round(timeStart * 1000) / 1000;
  }
  let srt = "";
  for (let s = 0; s < script.length; s++) {
    if (script[s][6]) {
      const text = script[s][1].trim();
      srt += `${s + 1}\n`;
      srt += `${script[s][6]} --> ${script[s][8]}\n`;
      srt += `<b>${script[s][0]}:</b> ${text}\n\n`;
    }
  };
  await writeFile(srt, `${title}.srt`);
  smartLog("info", "srt complete");
  srt = srt.split("\n");
  res.render("srt.njk", {
    srt,
    ptr,
    title,
  });
};

module.exports = { srtHandler };
