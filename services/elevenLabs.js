// Import necessary modules and dependencies
const voice = require('elevenlabs-node');
const path = require('path');
const axios = require('axios');
const directoryPath = path.join(__dirname, '../data');
const { smartLog } = require('../services/smart-log');
const elevenLabsAPI = 'https://api.elevenlabs.io/v1'; // Base URL for Eleven Labs API
const fs = require('fs');

// Function to get sample IDs for a given voice
const getSampleIds = async (voice_id, apiKey) => {
  smartLog('info', 'Get Sample IDs');
  const config = {
    headers: {
      accept: 'application/json',
      'xi-api-key': apiKey,
    },
    data: {
      text: 'string',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5,
      },
    },
  };

  try {
    let response = await axios.get(
      `https://api.elevenlabs.io/v2/voices/${voice_id}`, // API endpoint for getting sample IDs
      config
    );
    return response.data;
  } catch (error) {
    smartLog('error', 'error getting sample');
    smartLog('error', error.message);
    return '';
  }
};

// Function to get a voice sample for a given sample ID
const getVoiceSample = async (sample_id, apiKey) => {
  smartLog('info', 'Get Voice Sample');
  const config = {
    headers: {
      accept: 'application/json',
      'xi-api-key': apiKey,
    },
  };
  try {
    let response = await axios.get(
      `/v1/voices/{voice_id}/samples/${sample_id}/audio`, // API endpoint for getting voice sample
      config
    );
    return response.data.voices;
  } catch (error) {
    smartLog('error', 'error getting sample');
    smartLog('error', error.message);
    return '';
  }
};

// Function to generate a voice sample for a given voice ID
const generateSample = async (voiceID, apiKey) => {
  smartLog('info', 'GENERATING SAMPLE');
  try {
    await voice
      .textToSpeech(
        apiKey,
        voiceID,
        `${directoryPath}/samples/${voiceID}.mp3`,
        'Now is the winter of our discontent made glorious summer by this son of York.'
      )
      .then((res) => {
        smartLog('info', `Sound sample generated for ${voiceID}`);
        return 'Generated';
      });
  } catch (error) {
    smartLog('error', 'error generating speech');
    smartLog('error', error.message);
    return 'Failed';
  }
};

// Function to generate speech using the Eleven Labs API
const generateSpeech = async (apiKey, voiceID, fileName, textInput, title) => {
  try {
    // Check if required parameters are provided
    if (!apiKey || !voiceID || !fileName || !textInput) {
      smartLog('error', 'ERR: Missing parameter');
    }

    const voiceURL = `${elevenLabsAPI}/text-to-speech/${voiceID}`; // Full URL for generating speech
    fileName = `${directoryPath}/${title}/sound/sounds/${fileName}`;

    // Make a POST request to generate speech
    const response = await axios({
      method: 'POST',
      url: voiceURL,
      data: {
        text: textInput,
        voice_settings: {
          stability: 0,
          similarity_boost: 0
        },
        model_id: 'eleven_monolingual_v1',
      },
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      responseType: 'stream'
    });

    // Pipe the response data to create a local audio file
    response.data.pipe(fs.createWriteStream(fileName));

    return {
      status: 'ok'
    };

  } catch (error) {
    smartLog('error', error);
  }
};

// Function to get available voices from the Eleven Labs API
const getVoices = async (apiKey) => {
  smartLog('info', 'get voices');
  const config = {
    headers: {
      accept: 'application/json',
      'xi-api-key': apiKey,
    },
  };
  try {
    let response = await axios.get(
      'https://api.elevenlabs.io/v1/voices', // API endpoint for getting voices
      config
    );
    return response.data.voices;
  } catch (error) {
    smartLog('error', 'error getting voices');
    smartLog('error', error.message);
    return '';
  }
};

// Function to get subscription information for a user
const getUserSubscriptionInfo = async (apiKey) => {
  smartLog('info', 'get subscription');
  const config = {
    headers: {
      accept: 'application/json',
      'xi-api-key': apiKey,
    },
  };
  try {
    let response = await axios.get(
      'https://api.elevenlabs.io/v1/user/subscription', // API endpoint for getting subscription details
      config
    );
    return JSON.stringify(response.data, null, 4);
  } catch (error) {
    smartLog('error', 'error getting subscription details');
    smartLog('error', error.message);
    return '';
  }
};

// Export the functions for external use
module.exports = {
  generateSpeech,
  getVoices,
  getVoiceSample,
  getUserSubscriptionInfo,
  getSampleIds,
  generateSample,
};
