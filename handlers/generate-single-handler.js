const url = require("url");
const { getData, writeFile, getDuration } = require("../services/file-service");
const { generateSpeech } = require("../services/elevenLabs");
const dotenv = require("dotenv");
dotenv.config();
const { smartLog } = require("../services/smart-log");

const generateSingleHandler = async (req, res) => {
  smartLog("info", "ENTERING GENERATE SINGLE HANDLER");

  let u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const elementNumber = u.query.elementNumber;
  const voice = u.query.voice;
  const api_key = process.env.APIKEY;
  const caller = u.query.caller;

  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script } = filmFoxFile;
  const element = script[elementNumber]

  let sc = "0000" + element.scene;
  sc = sc.substring(sc.length - 4);
  let el = "0000" + elementNumber;
  el = el.substring(el.length - 4);
  const fileName = `${sc}_${el}.mp3`;

  const voice_data = await getData('voices.json');
  
  let voice_id = '';

  voice_data.forEach((v) => {
    if (v.name === voice) {
      voice_id = v.voice_id;
    }
  });

  console.log({fileName});

  const msg = await generateSpeech(
    api_key,
    voice_id,
    fileName,
    element.dialogue,
    title
  );

  setTimeout(async () => {
    if (msg !== "Failed") {
      script[elementNumber].sound = fileName;
      script[elementNumber].duration = await getDuration(title, fileName);
      script[elementNumber].voice = voice;
      await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
    };

    if ((caller === "edit-character")) {
      const char = element.character.toUpperCase();
      res.redirect(`/edit-character?title=${title}&character=${char}`);
    } else {
      res.redirect(`/display?title=${title}&sceneNumber=${element.scene}`);
    }
  });
};

module.exports = { generateSingleHandler };
