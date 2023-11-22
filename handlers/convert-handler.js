'use strict';

const fs = require('fs');
const path = require('path');
const url = require('url');
const dotenv = require('dotenv');
dotenv.config();
const { smartLog } = require('../services/smart-log');
var parseString = require('xml2js').parseString;

const {
  writeFile,
  createDirectory,
  getFile,
  readScriptData,
} = require('../services/file-service');

const addCharacter = (elements) => {
  let currentCharacter = '';
  const el = [];
  elements.forEach((e) => {
    if (e.type === 'Transition' || e.type === 'Scene Heading' || e.type === 'Action') {
      e.character = 'NARRATOR';
      el.push(e);
    } else if (e.type === 'Character') {
      currentCharacter = e.text.toUpperCase();
    } else {
      e.character = currentCharacter;
      el.push(e);
    }
  });
  return elements;
};

const buildCharactersByScene = (script) => {
  const chars = [];
  for (let i = 0; i < script.length; i++) {
    const c = [];
    script[i].forEach((s) => {
      c.push(s.character.toUpperCase());
    });
    let uniqueArray = c.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    });
    chars.push(uniqueArray);
  }
  return chars;
};

const strip = (text) => {
  let newText = '';
  text.forEach((t) => {
    if (typeof t === 'string') {
      newText += t;
    } else {
      newText += t['_'];
    }
  });
  return [newText];
};

const convertHandler = async (req, res) => {
  smartLog('info', 'ENTERING CONVERT HANDLER');
  const u = url.parse(req.originalUrl, true);
  let title = u.query.script;
  const api_key = process.env.APIKEY;
  const voices = await getFile('voices.json');
  const script = await readScriptData(`${title}`);
  parseString(script, async (err, result) => {
    const paragraphs = result.FinalDraft.Content[0].Paragraph;

    paragraphs.forEach((p) => {
      if (p.Text.length > 1) {
        p.Text = strip(p.Text);
      }
      //    if (p.$.Type === 'Character') {
      if (typeof p.Text[0] === 'object') {
        p.Text[0] = p.Text[0]['_'];
      }
      if (p.$.Type === 'Character') {
        const ptr = p.Text[0].indexOf('(');
        if (ptr !== -1) {
          p.Text[0] = p.Text[0].substring(0, p.Text[0].indexOf('(') - 1);
        }
      }
      //    }
    });

    let elements = [];
    let ptr = 0;
    paragraphs.forEach((p) => {
      if (p.$.Type === 'Scene Heading') {
        p.Text[0] = p.Text[0].toUpperCase();
        ptr++;
      }
      if (p.$.Type !== 'Parenthetical') {
        const element = { num: ptr, type: p.$.Type, text: p.Text[0] };
        elements.push(element);
      }
    });

    let el = addCharacter(elements);

    const script = [];

    for (let i = 0; i <= el[el.length - 1].num; i++) {
      script.push([]);
    }

    el.forEach((e) => {
      if (e.type !== 'Character') {
        let element = {
          character: e.character,
          dialogue: e.text,
          voice: '',
          sound: '',
          image: 'blank.jpg',
          duration: '',
          type: 'still',
        };
        script[e.num].push(element);
      }
    });

    let shotList = [];
    script.forEach((s, index) => {
      shotList.push({
        scene: index,
        lines: [
          {
            shot: '',
            angle: '',
            move: '',
            audio: '',
            subject: '',
            description: '',
          },
        ],
        note: '',
      });
    });

    let sceneOrder = [];
    script.forEach((s, index) => {
      sceneOrder.push(index);
    });

    title = title.substring(0, title.length - 4);
    await createDirectory(title);
    await createDirectory(`${title}/images`);
    await createDirectory(`${title}/scenes`);
    await createDirectory(`${title}/sheets`);
    await createDirectory(`${title}/sounds`);
    await createDirectory(`${title}/videos`);
    await createDirectory(`${title}/breakdown`);

    const directoryPath = path.join(__dirname, '../data');
    fs.copyFile(
      './blank.jpg',
      `${directoryPath}/${title}/images/blank.jpg`,
      (err) => {
        if (err) throw err;
        smartLog(
          'info',
          `blank.jpg was copied to ${directoryPath}/${title}/images/`
        );
      }
    );

    const characters = [];

    script.forEach((scene) => {
      scene.forEach((s) => {
        characters.push(s.character);
      });
    });

    const uniqueCharacters = characters.filter(
      (x, i) => i === characters.indexOf(x)
    );

    const characterList = [];

    uniqueCharacters.forEach((c) => {
      characterList.push([c, '']);
    });

    const credits = { title: title, producer: '', writer: '', director: '' };

    const charactersByScene = buildCharactersByScene(script);
    const nonSpeakers = [];

    const filmFoxFile = {
      script,
      shotList,
      sceneOrder,
      credits,
      charactersByScene,
      characterList,
      nonSpeakers,
    };

    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  });

  res.redirect(`/showreel?title=${title}&sceneNumber=0&elementNumber=0`);
};

module.exports = { convertHandler };
