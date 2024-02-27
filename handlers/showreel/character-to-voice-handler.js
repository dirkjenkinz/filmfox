'use strict';

const url = require('url');
const { getFile } = require('../../services/file-service');
const { smartLog } = require('../../services/smart-log');

// Function to transform voice data
const getVoiceData = (voices) => {
  let voice_data = [];
  voices.forEach((voice) => {
    let v = [];
    v.push(voice.name);
    v.push(voice.description);
    v.push(voice.voice_id);
    v.push(voice.labels.description);
    v.push(voice.labels.gender);
    v.push(voice.labels.accent);
    v.push(voice.labels.age);
    voice_data.push(v);
  });
  return voice_data.sort();
};

// Handler function for character-to-voice mapping
const characterToVoiceHandler = async (req, res) => {
  // Log entering the character-to-voice handler
  smartLog('info', 'ENTERING CHARACTER TO VOICE HANDLER');

  // Parse the URL to extract query parameters
  const u = url.parse(req.originalUrl, true);
  let sceneNumber = u.query.sceneNumber;
  let elementNumber = u.query.elementNumber;
  let scr1 = u.query.scr1;
  const title = u.query.title;

  // Retrieve film file and necessary data
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  let { characterList } = filmFoxFile;

  // Retrieve voice data from a file
  const voices = await getFile('voices.json');
  let voice_data = getVoiceData(voices);

  // Add a default entry to voice_data
  voice_data.unshift(['-', '', '']);

  // Set default values for sceneNumber and elementNumber if not provided
  if (!sceneNumber) sceneNumber = 0;
  if (!elementNumber) elementNumber = 0;

  // Map characterList to voice_data based on character names
  characterList.forEach((c) => {
    voice_data.forEach((v) => {
      if (c[1] === v[0]) {
        c[2] = v[2];
      }
    });
  });

  // Set default value for scr1 if not provided
  if (!scr1) scr1 = 0;

  // Sort characterList
  characterList = characterList.sort();

  // Update voice_data with 'used' information
  voice_data.forEach((v) => {
    let used = 'no';
    characterList.forEach((char) => {
      if (char[1] === v[0]) {
        used = 'yes';
      }
    });
    v.push(used);
  });

  // Render the character-to-voice template with necessary data
  res.render('character-to-voice.njk', {
    title,
    characters: characterList,
    voice_data,
    sceneNumber,
    elementNumber,
    page: 'Voice Map',
    caller: 'voice-map',
    scr1,
  });
};

// Export the handler function
module.exports = { characterToVoiceHandler };
