const url = require('url');
const voices = require('../../data/voices.json');

const {
  getScript,
  writeFile,
} = require("../file-service");

const getVoiceData = () => {
  let voice_data = [];
  let v = [];
  v.push('-');
  v.push('-');
  v.push('-');
  voice_data.push(v);
  voices.voices.forEach(voice => {
    let v = [];
    v.push(voice.name);
    v.push(voice.description);
    v.push(voice.voice_id);
    voice_data.push(v);
  });
  return voice_data;
};

const parseAction = (action, scene_number) => {
  let a = [];
  a[0] = 'NARRATOR';
  a[1] = action[1].substring(5);
  a[2] = scene_number;
  return a;
};

const parseDialogue = (dialogue, character, scene_number) => {
  let a = [];
  a[0] = character;
  a[1] = dialogue[1].substring(5);
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
      a[1] = heading[i].substring(5).trim();
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
  let scene_number = 0;
  let parse = [];
  let characters = [];
  script = script.toString().split('<Paragraph');
  for (let i = 1; i < script.length; i++) {
    script[i] = script[i].trim();
    let x = script[i].split('<');
    x[0] = x[0].substring(6);
    x[0] = x[0].substring(0, x[0].length - 9);
    if (x[0] === 'Action') {
      parse.push(parseAction(x, scene_number));
    } else if (x[0] === 'Transition') {
      parse.push(parseTransition(x, scene_number));
    } else if (x[0] === 'Dialogue') {
      parse.push(parseDialogue(x, current_character, scene_number));
    } else if (x[0] === 'Scene Heading') {
      scene_number++;
      parse.push(parseSceneHeading(x, scene_number)); 
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
  console.log("entering display handler !!!");
  let u = url.parse(req.originalUrl, true);
  let file = u.query.script;
  let script = await getScript(file);
  let parse = parseScript(script);

  let voice_data = getVoiceData();

  script = parse[0];
  parse[1].push(['NARRATOR', '-']);
  let characters = parse[1].sort();
  console.log({characters});
  let title = u.query.script;
  title = title.split('.');
  title = title[0];

  api_key = 'd0bf46f1a6940f687634b5fc97c7c018';

  const fff = {
    title,
    api_key,
    characters,
    voice_data,
    script,
  }

  writeFile(JSON.stringify(fff), title+'.fff');

  res.render('display.njk', {
    title,
    api_key,
    script,
  });
};

module.exports = { convertHandler };
