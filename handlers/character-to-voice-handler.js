
const url = require('url');
const { getData } = require('../services/file-service');

const characterToVoiceHandler = async (req, res) => {
  console.log('entering character to voice handler');

  let u = url.parse(req.originalUrl, true);
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file + '.fff');

  const { characters, voice_data, title } = filmFoxFile;

  res.render('character-to-voice.njk', {
    title,
    characters,
    voice_data,
  });
};

module.exports = { characterToVoiceHandler };