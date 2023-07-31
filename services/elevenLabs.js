const voice = require('elevenlabs-node');
const path = require('path');
const axios = require('axios');
const directoryPath = path.join(__dirname, '../data');
const { smartLog } = require('../services/smart-log');

const generateSpeech = async (apiKey, voiceID, fileName, textInput) => {
    smartLog('info', 'generate speech');
    await voice.textToSpeech(apiKey, voiceID, `${directoryPath}/${fileName}`, textInput).then(res => {
        smartLog('info', {res});
        smartLog('info', `sound file generated for ${fileName}`);
    })
};

const getVoices = async (apiKey) => {
    smartLog('info', 'get voices');
    const config = {
        headers: {
            'accept': 'application/json',
            'xi-api-key': apiKey
        }
    };
    let response = await axios.get('https://api.elevenlabs.io/v1/voices', config);
    return response.data.voices;
};

const getUserSubscriptionInfo = async (apiKey) => {
    smartLog('info', 'get subscription');
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