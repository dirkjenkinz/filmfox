const fs = require("fs");
const path = require("path");
const url = require("url");
const dotenv = require("dotenv");
dotenv.config();
const { smartLog } = require("../services/smart-log");
var convert = require("xml-js");

const {
  writeFile,
  createDirectory,
  readFile,
  readScriptData,
} = require("../services/file-service");

const buildScene = (details) => {
  // {"character":"NARRATOR","dialogue":"FADE IN:","scene":0,"voice":"Story Teller","sound":"0000_0000.mp3","image":"0pg0vOy7Gff5hsMiZ6uw--1--9ffg4.jpg","duration":0,"type":"still","slug":"yes"}]
  const scene = [];
  d2 = [];

  for (let i = 0; i < details.length; i++) {
    if (
      details[i].$.Type === "Scene Heading" ||
      details[i].$.Type === "Action" ||
      details[i].$.Type === "Dialogue" ||
      details[i].$.Type === "Character"
    ) {
      d2.push({type: details[i].$.Type, text: details[i].Text[0]});
    }
  };

  for (let i = 0; i < d2.length; i++) {
    if (
      d2[i].type === "Scene Heading" ||
      d2[i].type === "Action"
    ) {
      scene.push({
        character: "NARRATOR",
        dialogue: d2[i].text,
        scene: "",
        voice: "",
        sound: "",
        image: "",
        duration: "",
        type: "",
      });
    } else {
      if (d2[i].type === "Character") {
        const parenth = (d2[i].text.indexOf('('));
        if (parenth > -1){
          d2[i].text = d2[i].text.substring(0, parenth - 1) 
        };
        d2[i].text = d2[i].text.toUpperCase();

        scene.push({
          character: d2[i].text,
          dialogue: d2[i + 1].text,
          scene: "",
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
  let file = u.query.script;
  api_key = process.env.APIKEY;
  const voices = await readFile("voices.json");
  const script = await readScriptData(`${file}`);

  var parseString = require("xml2js").parseString;
  parseString(script, function (err, result) {
    const paragraphs = result.FinalDraft.Content[0].Paragraph;
    let ptr = 0;
    let elements = [];
    let obj1 = [];
    paragraphs.forEach((p) => {
      if (p.$.Type === "Scene Heading") {
        ptr++;
        obj1.push(elements);
        elements = [];
      }
      elements.push(p);
    });
    console.log(obj1)
    let script = [];
    for (let i = 0; i < obj1.length; i++) {
      script.push(buildScene(obj1[i], i + 1));
    }

   // console.log(script)
  });
};

module.exports = { convertHandler };
