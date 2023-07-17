
const url = require('url');
const { getData, writeFile } = require('../file-service');

const characterUpdateHandler = async (req, res) => {
  console.log('entering character update handler');

  let u = url.parse(req.originalUrl, true);
  let voice = u.query.voice;
  let character = u.query.character;
  let file = u.query.filmFoxFile;
  let fff = await getData(file + '.fff');

  const { title, characters, voice_data } = fff;

  characters.forEach(c => {
    if (c[0] === character) {
      c[1] = voice;
    }
  })

  writeFile(JSON.stringify(fff), title + '.fff');

  res.render('character-to-voice.njk', {
    title,
    characters,
    voice_data,
  });
};

module.exports = { characterUpdateHandler };