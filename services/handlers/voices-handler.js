const voices = require('../../data/voices.json');

const voicesHandler = async (req, res) => {
  console.log('Entering voice handler');
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
