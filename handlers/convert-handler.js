const fs = require("fs");
const path = require("path");
const url = require("url");
const dotenv = require("dotenv");
dotenv.config();
const { smartLog } = require("../services/smart-log");

const {
  getScript,
  writeFile,
  createDirectory,
  getListOfElements,
  getData,
} = require("../services/file-service");

const convertToObject = (script) => {
  const newScript = [];

  script.forEach((s) => {
    let slug = "no";
    if (s[0] === "NARRATOR") {
      if (s[1].substring(0, 3) === "INT" || s[1].substring(0, 3) === "EXT") {
        slug = "yes";
      }
    }
    newScript.push({
      character: s[0],
      dialogue: s[1],
      scene: s[2],
      voice: "",
      image: "",
      sound: "",
      duration: 0,
      type: "",
      slug: "",
    });
  });
  return newScript;
};

const getVoiceData = (voices) => {
  let voice_data = [];
  let v = [];
  v.push("-");
  v.push("-");
  v.push("-");
  voice_data.push(v);
  voices.forEach((voice) => {
    let v = [];
    v.push(voice.name);
    v.push(voice.description);
    v.push(voice.voice_id);
    voice_data.push(v);
  });
  return voice_data;
};

const parseAction = (action, scene_number) => {
  let text = "";

  for (let i = 1; i < action.length; i++) {
    if (action[i].substring(0, 4) === "Text");
    const start = action[i].indexOf(">") + 1;
    text += action[i].substring(start);
  }

  text = text.replace(/\n/g, "");

  let a = [];
  a.character = "NARRATOR";
  a.dialogue = text;
  a.scene = scene_number;
  return a;
};

const parseDialogue = (dialogue, character, scene_number) => {
  let text = "";

  for (let i = 1; i < dialogue.length; i++) {
    if (dialogue[i].substring(0, 4) === "Text");
    const start = dialogue[i].indexOf(">") + 1;
    text += dialogue[i].substring(start);
  }

  text = text.replace(/\n /g, "");
  text = text.replace(/\n /g, "");
  text = text.replace(/    /g, " ");
  text = text.replace(/    /g, " ");
  text = text.replace(/   /g, " ");
  text = text.replace(/   /g, " ");
  text = text.replace(/  /g, " ");
  text = text.replace(/  /g, " ");
  text = text.replace(/ \,/g, ",");
  text = text.replace(/ \./g, ".");
  text = text.replace(/ \!/g, "!");
  text = text.replace(/ \?/g, "?");

  let a = [];
  a[0] = character;
  a[1] = text.trim();
  a[2] = scene_number;
  return a;
};

const parseTransition = (transition, scene_number) => {
  let a = [];
  a[0] = "NARRATOR";
  a[1] = transition[1].substring(5);
  a[2] = scene_number;
  return a;
};

const parseSceneHeading = (heading, scene_number) => {
  let a = [];
  a[0] = "NARRATOR";
  for (let i = 1; i < heading.length; i++) {
    if (heading[i].substring(0, 5) === "Text>") {
      a[1] = heading[i].substring(5).trim().toUpperCase();
    }
  }
  a[2] = scene_number;
  return a;
};

const parseCharacter = (character, scene_number) => {
  let c = "";
  for (let i = 1; i < character.length; i++) {
    if (character[i].substring(0, 4) === "Text") {
      const l = character[i].indexOf(">") + 1;
      c = character[i].substring(l);
      if (c.indexOf("(") > 0) {
        c = c.substring(0, c.indexOf("("));
      }
    }
  }
  c = c.trim();
  c = c.toUpperCase();
  c[2] = scene_number;
  return c;
};

const parseScript = (script) => {
  let current_character = "";
  let scene_number = 1;
  let parse = [];
  let characters = [];
  script = script.toString().split("<Paragraph");

  for (let i = 1; i < script.length; i++) {
    script[i] = script[i].trim();
    let x = script[i].split("<");
    let cut = x[0].indexOf("Type=") + 6;
    x[0] = x[0].substring(cut);
    x[0] = x[0].substring(0, x[0].length - 9);
    if (x[0] === "Action") {
      parse.push(parseAction(x, scene_number));
    } else if (x[0] === "Transition") {
      parse.push(parseTransition(x, scene_number));
    } else if (x[0] === "Dialogue") {
      parse.push(parseDialogue(x, current_character, scene_number));
    } else if (x[0] === "Scene Heading") {
      parse.push(parseSceneHeading(x, scene_number));
      scene_number++;
    } else if (x[0] === "Character") {
      let c = parseCharacter(x, scene_number);
      if (c !== "") {
        current_character = parseCharacter(x, scene_number);
        if (!characters.includes(current_character)) {
          characters.push(current_character);
        }
      }
    }
  }

  const chars = [];
  characters.forEach((c) => {
    chars.push([c, "-"]);
  });

  return [parse, chars];
};

const convertHandler = async (req, res) => {
  smartLog("info", "ENTERING CONVERT HANDLER");
  const u = url.parse(req.originalUrl, true);
  let file = u.query.script;
  api_key = process.env.APIKEY;
  const voices = await getData("voices.json");
  let script = await getScript(file);
  let parse = parseScript(script);
  script = convertToObject(parse[0]);
  parse[1].push(["NARRATOR", "-"]);
  let characters = parse[1].sort();
  let title = u.query.script;
  title = title.split(".");
  title = title[0];

  let voice_data = await getVoiceData(voices);

  const rc = await createDirectory(title);

  const fff = {
    title,
    api_key,
    voice_data,
    script,
  };

  await writeFile(JSON.stringify(fff), `${title}/${title}.fff`);
  await writeFile(JSON.stringify(characters), `${title}/${title}.chrs`);
  await createDirectory(`${title}/sounds`);

  res.redirect(`/display?title=${title}&sceneNumber=0&locked=yes`);
};

module.exports = { convertHandler };
