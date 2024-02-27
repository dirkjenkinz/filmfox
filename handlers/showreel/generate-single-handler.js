'use strict';

// Import necessary modules
const url = require('url');
const { getFile, writeFile } = require('../../services/file-service');
const { generateSpeech } = require('../../services/elevenLabs');
const { smartLog } = require('../../services/smart-log');

// Handler for generating a single speech element
const generateSingleHandler = async (req, res) => {
  // Log the entry of the handler function
  smartLog('info', 'ENTERING GENERATE SINGLE HANDLER');

  // Parse URL parameters using the URL constructor
  let u = new URL(req.originalUrl, `http://${req.headers.host}`);
  const title = u.searchParams.get('title');
  const sceneNumber = u.searchParams.get('sceneNumber');
  const elementNumber = u.searchParams.get('elementNumber');
  const character = u.searchParams.get('character');
  const caller = u.searchParams.get('caller');
  const voice = u.searchParams.get('voice');
  const mute = u.searchParams.get('mute');
  const {api_key} = await getFile('control.json');

  // Retrieve script file for the given title
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;
  const element = script[sceneNumber][elementNumber];

  // Format scene and element numbers with leading zeros
  let sc = '0000' + sceneNumber;
  sc = sc.substring(sc.length - 4);
  let el = '0000' + elementNumber;
  el = el.substring(el.length - 4);
  const fileName = `${sc}_${el}.mp3`;

  // Retrieve voice data from the voices.json file
  const voice_data = await getFile('voices.json');

  // Find the voice_id for the specified voice
  let voice_id = '';
  voice_data.forEach((v) => {
    if (v.name === voice) {
      voice_id = v.voice_id;
    }
  });

  // Modify dialogue for NARRATOR character
  let dialogue = element.dialogue;
  if (element.character === 'NARRATOR') {
    if (dialogue.substring(0, 4) === 'INT.') {
      dialogue = `INTERIOR. ${dialogue.substring(4)}`;
    } else if (dialogue.substring(0, 4) === 'EXT.') {
      dialogue = `EXTERIOR. ${dialogue.substring(4)}`;
    }
  }

  // Generate speech using the external service
  let msg = await generateSpeech(api_key, voice_id, fileName, dialogue, title);

  // Delayed operation after generating speech
  setTimeout(async () => {
    // Update script with voice information if generation is successful
    if (msg !== 'Failed') {
      script[sceneNumber][elementNumber].voice = voice;
      await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
      msg = 'OK';
    }

    // Redirect based on the original caller
    if (caller === 'edit-character') {
      res.redirect(`/edit-character?title=${title}&character=${character}&msg=${msg}`);
    } else if (caller === 'sound') {
      res.redirect(`/sound?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
    } else if (caller === 'process-queue') {
      res.redirect(`/process-queue?title=${title}`);
    } else {
      res.redirect(`/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&speak=yes&mute=${mute}&msg=${msg}`);
    }
  }, 3000);
};

// Export the handler function
module.exports = { generateSingleHandler };
