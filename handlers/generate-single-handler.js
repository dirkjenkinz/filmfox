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
  const filmFoxFile = await getData(`${title}/${title}.fff`);
  const api_key = process.env.APIKEY;
  const caller = u.query.caller;

  const { script } = filmFoxFile;

  const element = script[elementNumber];
  let sc = "0000" + element.scene;
  sc = sc.substring(sc.length - 4);
  let el = "0000" + elementNumber;
  el = el.substring(el.length - 4);
  const fileName = `${sc}_${el}.mp3`;

  const { voice_data } = filmFoxFile;
  let voice_id;

  voice_data.forEach((v) => {
    if (v[0] === element.voice) {
      voice_id = v[2];
    }
  });

  console.log(element.voice);
  console.log({voice_id});
  console.log(element.dialogue)
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
      await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
    }

    if ((caller === "edit-character")) {
      res.redirect(`/edit-character?title=${title}&caharacter=${element.voice}`);
    } else {
      res.redirect(`/display?title=${title}&sceneNumber=${element.scene}`);
    }
  });
};

module.exports = { generateSingleHandler };
