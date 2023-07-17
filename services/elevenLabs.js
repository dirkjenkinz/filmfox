const voice = require('elevenlabs-node');
const fs = require('fs');

const apiKey = '0e2c037kl8561005671b1de345s8765c'; // Your API key from Elevenlabs
const voiceID = 'pNInz6obpgDQGcFmaJgB';            // The ID of the voice you want to get
const fileName = 'audio.mp3';                      // The name of your audio file
const textInput = 'mozzy is cool';                 // The text you wish to convert to speech

voice.textToSpeech(apiKey, voiceID, fileName, textInput).then(res => {
    console.log(res);
});