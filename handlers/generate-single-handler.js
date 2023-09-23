const url = require("url");
const { getData, writeFile, getDuration } = require("../services/file-service");
const { generateSpeech } = require("../services/elevenLabs");
const dotenv = require("dotenv");
dotenv.config();
const { smartLog } = require("../services/smart-log");

const generateSingleHandler = async (req, res) => {
  smartLog("info", "ENTERING GENERATE SINGLE HANDLER");

  let u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
  const file = u.query.file;
  const title = u.query.title;
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const characters = await getData(`${title}/${title}.chrs`);
  const api_key = process.env.APIKEY;

  const f = file.split("/");
  let sc = `0000${f[0]}`;
  sc = sc.substring(sc.length - 4);
  let el = `0000${f[1]}`;
  el = el.substring(el.length - 4);

  const fileName = `${sc}_${el}.mp3`;

  const { script, voice_data } = filmFoxFile;

  script.forEach((s) => {
    characters.forEach((c) => {
      if (c[0] === s.character) {
        s.voice = c[1];
      }
    });
  });

  const character_name = script[f[1]].voice;

  let voice_id = "";
  voice_data.forEach((v) => {
    if (v[0] === character_name) {
      voice_id = v[2];
    }
  });

  let text = script[f[1]].dialogue;

  if (script[f[1]].character === "NARRATOR") {
    const t = text.toUpperCase();
    if (t.substring(0, 9) === "INT./EXT.") {
      text = "INTERIOR / EXTERIOR" + text.substring(4);
    } else if (t.substring(0, 4) === "INT.") {
      text = "INTERIOR" + text.substring(4);
    } else if (t.substring(0, 4) === "EXT.") {
      text = "EXTERIOR" + text.substring(4);
    }
    text = text.replace(/\.\.\./g, "");
  }

  const msg = await generateSpeech(api_key, voice_id, fileName, text, title);

  setTimeout(async () => {
    
    if (msg !== "Failed") {
      script[f[1]].sound = fileName;
      script[f[1]].duration = await getDuration(title, fileName);
      await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
    }

    res.redirect(`/display?title=${title}&ptr=${ptr}`);
  });
};

module.exports = { generateSingleHandler };
