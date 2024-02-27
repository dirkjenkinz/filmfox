'use strict';

const url = require('url');
const { getFile, writeFile } = require('../../services/file-service');
const { smartLog } = require('../../services/smart-log');

// Function to transform voice data
const getVoiceData = (voices) => {
  let voice_data = [];

  voices.forEach(voice => {
    let v = [];
    v.push(voice.name);
    v.push(voice.description);
    v.push(voice.voice_id);
    voice_data.push(v);
  });

  return voice_data.sort();
};

// Handler function for character update
const characterUpdateHandler = async (req, res) => {
  // Log entering the character update handler
  smartLog('info', 'ENTERING CHARACTER UPDATE HANDLER');

  // Parse the URL to extract query parameters
  const u = url.parse(req.originalUrl, true);
  let voice = u.query.voice;
  let character = u.query.character;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const title = u.query.title;

  // Retrieve film file and necessary data
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const characters = filmFoxFile.characterList;
  const scr1 = u.query.scr1;

  // Retrieve voice data from a file
  const voices = await getFile('voices.json');
  let voice_data = getVoiceData(voices);

  // Add a default entry to voice_data
  voice_data.unshift(['-', '', '']);

  // Update character's voice in characters array
  characters.forEach(c => {
    if (c[0] === character) {
      c[1] = voice;
    }
  });

  // Write the updated file back
  writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  // Redirect to the character-to-voice page with necessary parameters
  res.redirect(`/ctv?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&scr1=${scr1}`);
};

// Export the handler function
module.exports = { characterUpdateHandler };
