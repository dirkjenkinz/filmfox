const voice = require('elevenlabs-node');
const path = require('path');
const axios = require('axios');
const directoryPath = path.join(__dirname, '../data');
const logger = require('../services/logger');

const  generateSpeech = (apiKey, voiceID, fileName, textInput) => {
    logger.log('info','generate speech');
    voice.textToSpeech(apiKey, voiceID, `${directoryPath}/${fileName}`, textInput).then(res => {
        logger.log('info', res);
    })
};

const getVoices = async () => {
    logger.log('info', 'get voices');
    const config = {
        headers: {
            'accept': 'application/json',
            'xi-api-key': 'd0bf46f1a6940f687634b5fc97c7c018'
        }
    };
    let response = await axios.get('https://api.elevenlabs.io/v1/voices', config);
    return JSON.stringify(response.data, null, 4);
};

module.exports = {
    generateSpeech,
    getVoices,
}