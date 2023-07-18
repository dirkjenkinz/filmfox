const { getVoices, textToSpeech } = require('./gecko');
const { writeFile } = require('../file-service');

const voice = require('elevenlabs-node');
const fs = require('fs');

const testHandler = async (req, res) => {
  console.log('Entering test handler');

  const apiKey = 'd0bf46f1a6940f687634b5fc97c7c018'; // Your API key from Elevenlabs
  const voiceID = 'TxGEqnHWrfWFTfGW9XjX';            // The ID of the voice you want to get

  const voiceResponse = voice.getVoice(apiKey, voiceID).then(res => {
    console.log(res.name);
  });

  const fileName = 'bigAudio.mp3';                      // The name of your audio file
  const textInput = 'mozzy is cool';                 // The text you wish to convert to speech

  voice.textToSpeech(apiKey, voiceID, fileName, textInput).then(res => {
    console.log(res);
  });

  res.render('main.njk', {
  });
};

module.exports = { testHandler };
