'use strict';

const url = require('url');
const { getFile, writeFile } = require('../services/file-service');
const { generateSpeech } = require('../services/elevenLabs');
const dotenv = require('dotenv');
dotenv.config();
const { smartLog } = require('../services/smart-log');

const createData = (element, sceneNumber, elementNumber, voice_data, characterList) => {
  let voice = '';
  characterList.forEach((c) => {
    if (c[0] == element.character) voice = c[1];
  });

  let sc = '0000' + sceneNumber;
  sc = sc.substring(sc.length - 4);
  let el = '0000' + elementNumber;
  el = el.substring(el.length - 4);
  const fileName = `${sc}_${el}.mp3`;

  let voice_id = '';
  voice_data.forEach((v) => {
    if (v.name === voice) {
      voice_id = v.voice_id;
    }
  });

  let dialogue = element.dialogue;
  if (element.character === 'NARRATOR') {
    if (dialogue.substring(0, 4) === 'INT.') {
      dialogue = `INTERIOR. ${dialogue.substring(4)}`;
    } else if (dialogue.substring(0, 4) === 'EXT.') {
      dialogue = `EXTERIOR. ${dialogue.substring(4)}`;
    };
  };
  return [fileName, voice_id, dialogue, voice];
};

const compileSceneHandler = async (req, res) => {
  smartLog('info', 'ENTERING COMPILE SCENE HANDLER');

  let u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const api_key = process.env.APIKEY;

  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script, characterList } = filmFoxFile;
  const scene = script[sceneNumber];
  const voice_data = await getFile('voices.json');

  scene.forEach(async (element, index) => {
      const data = createData(element, sceneNumber, index, voice_data, characterList);

      let msg = await setTimeout(async () => {
        let message =  generateSpeech(
          api_key,
          data[1],                    // voice id
          data[0],                    // filename
          data[2],                    // dialogue
          title
        );
        return message;
      }, 3000);

      if (msg !== 'Failed') {
        script[sceneNumber][elementNumber].voice = data[3];
        await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
        msg = 'OK';
      };    
  });

  res.redirect(`/sound?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
};

module.exports = { compileSceneHandler };
