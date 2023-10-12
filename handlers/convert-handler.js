const fs = require("fs");
const path = require("path");
const url = require("url");
const dotenv = require("dotenv");
dotenv.config();
const { smartLog } = require("../services/smart-log");
var parseString = require("xml2js").parseString;

const {
  writeFile,
  createDirectory,
  readFile,
  readScriptData,
} = require("../services/file-service");

const buildScene = (details) => {
  const num = details[0].num;
  const scene = [];
  const d2 = [];
  for (let i = 0; i < details.length; i++) {
    if (
      details[i].type === "Scene Heading" ||
      details[i].type === "Action" ||
      details[i].type === "Dialogue" ||
      details[i].type === "Character" ||
      details[i].type === "Transition"
    ) {
      d2.push({ type: details[i].type, text: details[i].text });
    }
  }
  for (let i = 0; i < d2.length; i++) {
    if (
      d2[i].type === "Scene Heading" ||
      d2[i].type === "Action" ||
      d2[i].type === "Transition"
    ) {
      scene.push({
        character: "NARRATOR",
        dialogue: d2[i].text,
        scene: num,
        voice: "",
        sound: "",
        image: "",
        duration: "",
        type: "",
      });
    } else {
      if (d2[i].type === "Character") {
        const parenth = d2[i].text.indexOf("(");
        if (parenth > -1) {
          d2[i].text = d2[i].text.substring(0, parenth - 1);
        }
        d2[i].text = d2[i].text.toUpperCase();

        scene.push({
          character: d2[i].text,
          dialogue: d2[i + 1].text,
          scene: num,
          voice: "",
          sound: "",
          image: "",
          duration: "",
          type: "",
        });
      }
    }
  }
  return scene;
};

const convertHandler = async (req, res) => {
  smartLog("info", "ENTERING CONVERT HANDLER");
  const u = url.parse(req.originalUrl, true);
  let title = u.query.script;
  const api_key = process.env.APIKEY;
  const voices = await readFile("voices.json");
  const script = await readScriptData(`${title}`);
  parseString(script, async (err, result) => {
    const paragraphs = result.FinalDraft.Content[0].Paragraph;
    let elements = [];
    let ptr = 0;
    paragraphs.forEach((p) => {
      if (p.$.Type === "Scene Heading") {
        ptr++;
      }
      const element = { num: ptr, type: p.$.Type, text: p.Text[0] };
      elements.push(element);
    });

    tank = [];

    for (i = 0; i <= ptr; i++) {
      tank.push([]);
    }

    elements.forEach((e) => {
      tank[e.num].push(e);
    });

    let script = [];

    for (let i = 0; i < tank.length; i++) {
      script.push(buildScene(tank[i]));
    }

    shotList = [];
    script.forEach((s, index) => {
      shotList.push({
        scene: index,
        lines: [
          {
            shot: "",
            angle: "",
            move: "",
            audio: "",
            subject: "",
            description: "",
          },
        ],
        note: "",
      });
    });
    sceneOrder = [];
    script.forEach((s, index) => {
      sceneOrder.push(index);
    });

    title = title.substring(0, title.length - 4);
    console.log({ title });
    await createDirectory(title);

    const fff = {
      script,
      shotList,
      sceneOrder,
    };

    const characters = [];

    script.forEach((scene) => {
      scene.forEach((s) => {
        characters.push(s.character);
      });
    });

    const uniqueCharacters = characters.filter(
      (x, i) => i === characters.indexOf(x)
    );

    console.log({ uniqueCharacters });

    const characterArray = [];

    uniqueCharacters.forEach((c) => {
      characterArray.push([c, ""]);
    });

    await writeFile(JSON.stringify(characterArray), `${title}/${title}.chrs`);
    await writeFile(JSON.stringify(fff), `${title}/${title}.fff`);
  });
  res.redirect(`/display?title=${title}&sceneNumber=0&locked='yes`);
};

module.exports = { convertHandler };
