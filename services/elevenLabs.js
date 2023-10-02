const voice = require('elevenlabs-node');
const path = require('path');
const axios = require('axios');
const directoryPath = path.join(__dirname, '../data');
const { smartLog } = require('../services/smart-log');

const getSampleIds = async (voice_id, apiKey) => {
    smartLog('info', 'Get Sample IDs');
    const config = {
        headers: {
            'accept': 'application/json',
            'xi-api-key': apiKey
        }
    };
    try {
        let response = await axios.get(`https://api.elevenlabs.io/v1/voices/${voice_id}`, config);
        return response.data;
    } catch (error) {
        smartLog('error', 'error getting sample');
        smartLog('error', error.message);
        return '';
    }
};

const getVoiceSample = async (sample_id) => {
    smartLog('info', 'Get Voice Sample');
    const config = {
        headers: {
            'accept': 'application/json',
            'xi-api-key': apiKey
        }
    };
    try {
        let response = await axios.get('/v1/voices/{voice_id}/samples/{sample_id}/audio', config);
        return response.data.voices;
    } catch (error) {
        smartLog('error', 'error getting sample');
        smartLog('error', error.message);
        return '';
    }
};

const generateSample = async (voiceID, apiKey) => {
    smartLog('info', 'GENERATING SAMPLE');
    try {
        await voice.textToSpeech(apiKey, voiceID, `${directoryPath}/samples/${voiceID}.mp3`, "Now is the winter of our discontent made glorious summer by this son of York.").then(res => {
            smartLog('info', `Sound sample generated for ${voiceID}`);
            return 'Generated';
        });
    } catch (error) {
        smartLog('error', 'error generating speech');
        smartLog('error', error.message);
        return 'Failed';
    }
};

const generateSpeech = async (apiKey, voiceID, fileName, textInput, title) => {
    smartLog('info', 'generate speech');
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
    getVoiceSample,
    getSampleIds,
    generateSample,
};