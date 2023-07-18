const { getVoices } = require('../services/elevenLabs');
const { writeFile } = require('../services/file-service');

const voicesHandler = async (req, res) => {
  console.log('Entering voice handler');

  let voices = await getVoices();
  await writeFile(voices, 'voices.json');
  voices = JSON.parse(voices);

  let voice_data = [];

  voices.voices.forEach(voice => {
    let v = [];
    v.push(voice.name);
    v.push(voice.description);
    v.push(voice.voice_id);
    voice_data.push(v);
  });

  res.render('voices.njk', {
    voice_data,
  });
};

module.exports = { voicesHandler };
