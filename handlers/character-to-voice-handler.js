
const url = require('url');
const { getData } = require('../services/file-service');

const characterToVoiceHandler = async (req, res) => {
  console.log('entering character to voice handler');

  const u = url.parse(req.originalUrl, true);
  const ptr = u.query.ptr;
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file + '.fff');

  const { characters, voice_data, title, script } = filmFoxFile;
  voice_data.sort();

  const end = script.length - 10;

  res.render('character-to-voice.njk', {
    title,
    characters,
    voice_data,
    ptr,
    end,
  });
};

module.exports = { characterToVoiceHandler };