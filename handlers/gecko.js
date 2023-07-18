const axios = require('axios');

const getVoices = async () => {
    console.log('get voices');

    const config = {
        headers: {
            'accept': 'application/json',
            'xi-api-key': 'd0bf46f1a6940f687634b5fc97c7c018'
        }
    };
    let response = await axios.get('https://api.elevenlabs.io/v1/voices', config);
    return JSON.stringify(response.data, null, 4);
};

const textToSpeech = async () => {
    console.log('text to speech');

    config = {
        "text": "Moonlight becomes you",
        "model_id": "eleven_monolingual_v1",
        "voice_settings": {
            "stability": 0,
            "similarity_boost": 0,
            "style": 0.5,
            "use_speaker_boost": false
        },
    },
    {
        params: { 'api-version': '3.0' },
        headers: {
            'accept': 'audio/mpeg',
            'xi-api-key': 'd0bf46f1a6940f687634b5fc97c7c018',
            'Content-Type': 'application/json'
        },
    }

    let response = await axios.post(
        'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM?optimize_streaming_latency=0', config);
   
    return response.data;
};

module.exports = { getVoices, textToSpeech }