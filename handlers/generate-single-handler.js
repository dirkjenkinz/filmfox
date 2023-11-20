'use strict';

const url = require('url');
const { readFile, writeFile, getDuration } = require('../services/file-service');
const { generateSpeech } = require('../services/elevenLabs');
const dotenv = require('dotenv');
dotenv.config();
const { smartLog } = require('../services/smart-log');

const generateSingleHandler = async (req, res) => {
  smartLog('info', 'ENTERING GENERATE SINGLE HANDLER');

  let u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const character = u.query.character;
  const caller = u.query.caller;
  const voice = u.query.voice;
  const api_key = process.env.APIKEY;
  const mute = u.query.mute;

  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;
  const element = script[sceneNumber][elementNumber];
  let sc = '0000' + sceneNumber;
  sc = sc.substring(sc.length - 4);
  let el = '0000' + elementNumber;
  el = el.substring(el.length - 4);
  const fileName = `${sc}_${el}.mp3`;

  const voice_data = await readFile('voices.json');
  
  let voice_id = '';

  voice_data.forEach((v) => {
    if (v.name === voice) {
      voice_id = v.voice_id;
    }
  });

  let dialogue = element.dialogue;

  if (element.character === 'NARRATOR'){
    if (dialogue.substring(0,4) === 'INT.'){
      dialogue = `INTERIOR. ${dialogue.substring(4)}`;
    } else if (dialogue.substring(0,4) === 'EXT.'){
      dialogue = `EXTERIOR. ${dialogue.substring(4)}`;
    };
  };

  console.log({api_key});
  console.log({voice_id});
  console.log({dialogue});

  let msg = await generateSpeech(
    api_key,
    voice_id,
    fileName,
    dialogue,
    title
  );

  setTimeout(async () => {
    if (msg !== 'Failed') {
      script[sceneNumber][elementNumber].sound = fileName;
      script[sceneNumber][elementNumber].duration = await getDuration(title, fileName);
      script[sceneNumber][elementNumber].voice = voice;
      await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
      msg = 'OK';
    };
    
    if (caller === 'edit-character'){
      res.redirect(`/edit-character?title=${title}&character=${character}&msg=${msg}`);
    } else {
      res.redirect(`/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&speak=yes&mute=${mute}&msg=${msg}`);
    };
    }, 3000);
};

module.exports = { generateSingleHandler };
