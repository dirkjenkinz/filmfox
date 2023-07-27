const voice = require('elevenlabs-node');
const path = require('path');
const axios = require('axios');
const directoryPath = path.join(__dirname, '../data');
const logger = require('../services/logger');

const generateSpeech = async (apiKey, voiceID, fileName, textInput) => {
    logger.log('info', 'generate speech');
    await voice.textToSpeech(apiKey, voiceID, `${directoryPath}/${fileName}`, textInput).then(res => {
        console.log({res});
        logger.log('info', `sound file generated for ${fileName}`);
    })
};

const getVoices = async (apiKey) => {
    logger.log('info', 'get voices');
    const config = {
        headers: {
            'accept': 'application/json',
            'xi-api-key': apiKey
        }
    };
    let response = await axios.get('https://api.elevenlabs.io/v1/voices', config);
    return response;
};

const getUserSubscriptionInfo = async (apiKey) => {
    logger.log('info', 'get subscription');
    const config = {
        headers: {
            'accept': 'application/json',
            'xi-api-key': apiKey
        }
    };
    let response = await axios.get('https://api.elevenlabs.io/v1/user/subscription', config);
    return JSON.stringify(response.data, null, 4);
};


module.exports = {
    generateSpeech,
    getVoices,
    getUserSubscriptionInfo,
};