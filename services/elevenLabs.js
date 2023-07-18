const voice = require('elevenlabs-node');
const path = require('path');

const directoryPath = path.join(__dirname, '../data');

const  generateSpeech = (apiKey, voiceID, fileName, textInput) => {
    console.log('generate speech');
    voice.textToSpeech(apiKey, voiceID, `${directoryPath}/${fileName}`, textInput).then(res => {
        console.log(res);
    })
};

module.exports = {
    generateSpeech,
}