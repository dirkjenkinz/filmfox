const fs = require('fs');
const path = require('path');
const url = require('url');
const dotenv = require('dotenv');
dotenv.config();
const { smartLog } = require('../services/smart-log');

const {
  getScript,
  writeFile,
  createDirectory,
  getListOfElements,
  getData,
} = require("../services/file-service");

const getVoiceData = (voices) => {
  let voice_data = [];
  let v = [];
  v.push('-');
  v.push('-');
  v.push('-');
  voice_data.push(v);
  voices.forEach(voice => {
    let v = [];
    v.push(voice.name);
    v.push(voice.description);
    v.push(voice.voice_id);
    voice_data.push(v);
  });
  return voice_data;
};

const parseAction = (action, scene_number) => {
  let text = '';

  for (let i = 1; i < action.length; i++) {
    if (action[i].substring(0, 4) === 'Text');
    const start = action[i].indexOf('>') + 1;
    text += action[i].substring(start);
  }

  text = text.replace(/\n/g,'')

  let a = [];
  a[0] = 'NARRATOR';
  a[1] = text;
  a[2] = scene_number;
  return a;
};

const parseDialogue = (dialogue, character, scene_number) => {
  let text = '';

  for (let i = 1; i < dialogue.length; i++) {
    if (dialogue[i].substring(0, 4) === 'Text');
    const start = dialogue[i].indexOf('>') + 1;
    text += dialogue[i].substring(start);
  }

  text = text.replace(/\n /g, '');

  let a = [];
  a[0] = character;
  a[1] = text.trim();
  a[2] = scene_number;
  return a;
};

const parseTransition = (transition, scene_number) => {
  let a = [];
  a[0] = 'NARRATOR';
  a[1] = transition[1].substring(5);
  a[2] = scene_number;
  return a;
};

const parseSceneHeading = (heading, scene_number) => {
  let a = [];
  a[0] = 'NARRATOR';
  for (let i = 1; i < heading.length; i++) {
    if (heading[i].substring(0, 5) === 'Text>') {
      a[1] = heading[i].substring(5).trim().toUpperCase();
    };
  };
  a[2] = scene_number;
  return a;
};

const parseCharacter = (character, scene_number) => {
  let c = '';
  for (let i = 1; i < character.length; i++) {
    if (character[i].substring(0, 5) === 'Text>') {
      c = character[i].substring(5);
      if (c.indexOf('(') > 0) {
        c = c.substring(0, c.indexOf('('));
      };
    };
  };
  c = c.trim();
  c = c.toUpperCase();
  c[2] = scene_number;
  return c;
};

const parseScript = script => {
  let current_character = '';
  let scene_number = 1;
  let parse = [];
  let characters = [];
  script = script.toString().split('<Paragraph');

  for (let i = 1; i < script.length; i++) {
    script[i] = script[i].trim();
    let x = script[i].split('<');
    let cut = x[0].indexOf('Type=') + 6;
    x[0] = x[0].substring(cut);
    x[0] = x[0].substring(0, x[0].length - 9);
    if (x[0] === 'Action') {
      parse.push(parseAction(x, scene_number));
    } else if (x[0] === 'Transition') {
      parse.push(parseTransition(x, scene_number));
    } else if (x[0] === 'Dialogue') {
      parse.push(parseDialogue(x, current_character, scene_number));
    } else if (x[0] === 'Scene Heading') {
      parse.push(parseSceneHeading(x, scene_number));
      scene_number++;
    } else if (x[0] === 'Character') {
      let c = parseCharacter(x, scene_number);
      if (c !== '') {
        current_character = parseCharacter(x, scene_number);
        if (!characters.includes(current_character)) {
          characters.push(current_character);
        };
      };
    };
  };

  const chars = [];
  characters.forEach(c => {
    chars.push([c, '-']);
  })

  return [parse, chars];
}

const convertHandler = async (req, res) => {
  smartLog('info', 'entering display handler');
  const u = url.parse(req.originalUrl, true);
  let file = u.query.script;
  api_key = process.env.API;
  const voices= await getData('voices.json');
  let script = await getScript(file);
  let parse = parseScript(script);
  script = parse[0];
  parse[1].push(['NARRATOR', '-']);
  let characters = parse[1].sort();
  let title = u.query.script;
  title = title.split('.');
  title = title[0];

  let voice_data = await getVoiceData(voices);

  const rc = await createDirectory(title);

  const elements = await getListOfElements(title);
  elements.forEach((e, index) => {
    e = e.substring(6);
    e = e.substring(0, 6);
    elements[index] = parseInt(e);
  });

  script.forEach((s) => {
    s.push('-');
    s.push('');
  });

  const elementNames = await getListOfElements(title);
  elements.forEach((num) => {
    script[num][4] = elementNames[num];
  });

  await writeFile('', `${title}.srt`);

  offset = 0;

  const fff = {
    title,
    api_key,
    voice_data,
    script,
    offset
  };

  await writeFile(JSON.stringify(fff), title + '.fff');

  const directoryPath = path.join(__dirname, '../data');
  if (!fs.existsSync(`${directoryPath}/${title}.chrs`)) {
    await writeFile(JSON.stringify(characters), title + '.chrs');
  };

  res.redirect(`/display?filmFoxFile=${title}.fff&ptr=0`);
};

module.exports = { convertHandler };
