const voice = require('elevenlabs-node');

const  generateSpeech = (apiKey, voiceID, fileName, textInput) => {
    voice.textToSpeech(apiKey, voiceID, fileName, textInput).then(res => {
        console.log(res);
    })
};

module.exports = {
    generateSpeech,
}