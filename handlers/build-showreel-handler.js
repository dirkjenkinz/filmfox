const fs = require("fs");
const path = require("path");
const url = require("url");
const { smartLog } = require("../services/smart-log");
const { createCanvas, loadImage, registerFont } = require("canvas");
registerFont("C:/Windows/Fonts/arialbd.ttf", { family: "Arial Bold" });
registerFont("C:/Windows/Fonts/timesbd.ttf", { family: "Times Bold" });
const {
  getDuration,
  getListOfElements,
  getData,
  writeFile,
} = require("../services/file-service");

const chopItUp = (block) => {
  if (block.length < 31) return block;

  let text = "";
  let bit;

  do {
    bit = block.substring(0, 70);
    let lastSpace = bit.lastIndexOf(" ");
    text = text + bit.substring(0, lastSpace);
    text = text + "\n";
    block = block.substring(lastSpace + 1);
  } while (block.length > 70);
  text = text + block;
  return text;
};

const modifyImage = (title, original, cnt, speaker, text) => {
  const dataPath = path.join(__dirname, `../data/${title}`);

  const lineBreaks = (text.match(/\n/g) || []).length;
  const speakerPos = 450 - lineBreaks * 30;

  loadImage(`${dataPath}/images/${original}`).then((img) => {
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    ctx.font = '72px "Arial Bold"';
    ctx.fillStyle = "White";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.fillText("Satellite", 80, 120);
    ctx.strokeText("Satellite", 80, 120);

    ctx.font = '45px "Arial Bold"';
    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.fillText(speaker, 80, speakerPos);
    ctx.strokeText(speaker, 80, speakerPos);

    ctx.font = '36px "Arial Bold"';
    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.fillText(text, 80, speakerPos + 50);
    ctx.strokeText(text, 80, speakerPos + 50);

    let sSave = "00000" + cnt + ".png";
    sSave = sSave.substring(sSave.length - 10);

    const out = fs.createWriteStream(`${dataPath}/cards/${sSave}`);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
  });
};

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

const buildShowreelHandler = async (req, res) => {
  smartLog("info", "entering build showreel handler");
  const u = url.parse(req.originalUrl, true);
  let title = u.query.title;
  let ptr = u.query.ptr;
  let filmFoxFile = await getData(`${title}/${title}.fff`);
  const { script } = filmFoxFile;
  let timeStart = 0.0;
  let timeFinish = 0.0;
  smartLog("info", "building showreel data");
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

  let showreel = [];
  for (let s = 0; s < script.length; s++) {
    if (script[s][6]) {
      const obj = {
        start: `${script[s][6]}`,
        finish: `${script[s][8]}`,
        character: `${script[s][0]}`,
        dialogue: `${script[s][1].trim()}`,
        card: `${script[s][5]}`,
        sound: `${script[s][4]}`,
      };
      showreel.push(obj);
    }
  }

  /*
  showreel.forEach(async (s, index) => {
    text = chopItUp(s.dialogue);
    if (
      s.card.substring(s.card.length - 4) !== ".mp3" &&
      s.card.substring(s.card.length - 4) !== ".mov" &&
      s.card.substring(s.card.length - 4) !== ".avi"
    ) {
      modifyImage(title, s.card, index, s.character, text);
    } else {
      modifyImage(title, "blank.jpg", index, s.character, text);
    }
  });
*/
  await writeFile(JSON.stringify(showreel), `/${title}/${title}.shw`);

  smartLog("info", "showreel complete");
  res.redirect(`/display?filmFoxFile=${title}&ptr=${ptr}`);
};

module.exports = { buildShowreelHandler };
