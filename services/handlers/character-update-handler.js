
const url = require('url');
const {getData} = require('../file-service');

const characterUpdateHandler = async (req, res) => {
  console.log('entering character update handler');

  let u = url.parse(req.originalUrl, true);
  let file = u.query.filmFoxFile;
  console.log({file});
  let filmFoxFile = await getData(file+'.fff');

  const { title, characters, voice_data} = filmFoxFile;

  res.render('character-to-voice.njk', {
    title,
    characters,
    voice_data,
  });
};

module.exports = { characterUpdateHandler };