const voice = require('elevenlabs-node');
const path = require('path');
const axios = require('axios');
const directoryPath = path.join(__dirname, '../data');
const { smartLog } = require('../services/smart-log');
const elevenLabsAPI = 'https://api.elevenlabs.io/v1';
const fs = require('fs');


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
      `https://api.elevenlabs.io/v2/voices/${voice_id}`,
      config
    );
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
      accept: 'application/json',
      'xi-api-key': apiKey,
    },
  };
  try {
    let response = await axios.get(
      '/v1/voices/{voice_id}/samples/{sample_id}/audio',
      config
    );
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

  const generateSpeech = async (apiKey, voiceID, fileName, textInput, title) => {
  try {

		if (!apiKey || !voiceID || !fileName || !textInput) {
			smartLog('error', 'ERR: Missing parameter');
		}

		const voiceURL = `${elevenLabsAPI}/text-to-speech/${voiceID}`;
    fileName = `${directoryPath}/${title}/sounds/${fileName}`;

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

		response.data.pipe(fs.createWriteStream(fileName));

		return {
			status: 'ok'
		};

	} catch (error) {
		smartLog('error', error);
	}
};

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
      'https://api.elevenlabs.io/v1/voices',
      config
    );
    return response.data.voices;
  } catch (error) {
    smartLog('error', 'error getting voices');
    smartLog('error', error.message);
    return '';
  }
};

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
      'https://api.elevenlabs.io/v1/user/subscription',
      config
    );
    return JSON.stringify(response.data, null, 4);
  } catch (error) {
    smartLog('error', 'error getting subscription details');
    smartLog('error', error.message);
    return '';
  }
};

module.exports = {
  generateSpeech,
  getVoices,
  getVoiceSample,
  getUserSubscriptionInfo,
  getSampleIds,
  generateSample,
};
