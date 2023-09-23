const voice = require('elevenlabs-node');
const path = require('path');
const axios = require('axios');
const directoryPath = path.join(__dirname, '../data');
const { smartLog } = require('../services/smart-log');

const generateSpeech = async (apiKey, voiceID, fileName, textInput, title) => {
    smartLog('info', 'generate speech');
    console.log({apiKey});
    console.log({voiceID})
    console.log({fileName})
    console.log({textInput})
    console.log({title})
    try {
        await voice.textToSpeech(apiKey, voiceID, `${directoryPath}/${title}/sounds/${fileName}`, textInput).then(res => {
            smartLog('info', `sound file generated for ${fileName}`);
            return 'Generated';
        });
    } catch (error) {
        smartLog('error', 'error generating speech');
        smartLog('error', error.message);
        return 'Failed';
    }
};

const getVoices = async (apiKey) => {
    smartLog('info', 'get voices');
    const config = {
        headers: {
            'accept': 'application/json',
            'xi-api-key': apiKey
        }
    };
    try {
        let response = await axios.get('https://api.elevenlabs.io/v1/voices', config);
        return response.data.voices;
    } catch (error) {
        smartLog('error', 'error getting voices');
        smartLog('error', error.message);
        return '';
    };
};

const getUserSubscriptionInfo = async (apiKey) => {
    smartLog('info', 'get subscription');
    const config = {
        headers: {
            'accept': 'application/json',
            'xi-api-key': apiKey
        }
    };
    try {
        let response = await axios.get('https://api.elevenlabs.io/v1/user/subscription', config);
        return JSON.stringify(response.data, null, 4);
    } catch (error) {
        smartLog('error', 'error getting subscription details');
        smartLog('error', error.message);
        return '';
    };
};

module.exports = {
    generateSpeech,
    getVoices,
    getUserSubscriptionInfo,
};