const url = require("url");
const { smartLog } = require("../services/smart-log");
const {
  getData,
  writeFile,
  getDuration,
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

const srtHandler = async (req, res) => {
  smartLog("info", "entering srt handler");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const ptr = u.query.ptr;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  for (i = 0; i < script.length; i++ ){
    script[i].duration = await getDuration(title, `${script[i].sound}.mp3`);
  };

  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  timeStart = 0.000;
  smartLog("info", "building srt data");

  let t = 0.00;
  const sub = [];
  script.forEach((s)=>{
    sub.push({
      duration: s.duration,
      speaker: s.character,
      dialogue: s.dialogue,
      start: formatTime(t),
      finish: formatTime(t + s.duration),
    })
    t = t + s.duration;
  });

  let srt = '';
  sub.forEach((s, index) => {
    srt += `${index + 1}\n`;
    srt += `${s.start} --> ${s.finish}\n`;
    srt += `<b>${s.speaker}:</b> ${s.dialogue}\n\n`;
  });

  await writeFile(srt, `${title}/${title}.srt`);
  smartLog("info", "srt complete");
  srt = srt.split("\n");
  res.render("srt.njk", {
    srt,
    ptr,
    title,
  });
};

module.exports = { srtHandler };
