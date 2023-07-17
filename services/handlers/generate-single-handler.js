
const url = require('url');
const { getData, writeFile } = require('../file-service');

const generateSingleHandler = async (req, res) => {
  console.log('entering generate single handler');

  let u = url.parse(req.originalUrl, true);
  let element = u.query.element;
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file + '.fff');

  const {title, api_key, characters, script, voice_data } = filmFoxFile;

  script.forEach(scriptChar => {
    characters.forEach(c => {
      if (c[0] === scriptChar[0]){
        scriptChar[3] = c[1];
      };
    })
  });

  const character_name = script[element][3];

  let voice_id = '';
  voice_data.forEach(v => {
    if (v[0] === character_name){
      voice_id = v[2];
    };
  });

  console.log({voice_id});
  console.log(script[element][1]);

  res.render('display.njk', {
    title,
    api_key,
    script,
  });
};

module.exports = { generateSingleHandler };