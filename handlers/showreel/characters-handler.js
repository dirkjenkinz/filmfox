'use strict';

const { URL } = require('url'); // Using the URL constructor for parsing URLs
const { smartLog } = require('../../services/smart-log');
const { getFile } = require('../../services/file-service');

const charactersHandler = async (req, res) => {
  smartLog('info', 'ENTERING CHARACTERS HANDLER');

  // Parse the URL to extract query parameters using the URL constructor
  const u = new URL(req.originalUrl, `http://${req.headers.host}`);
  const title = u.searchParams.get('title');
  const sceneNumber = u.searchParams.get('sceneNumber');
  const elementNumber = u.searchParams.get('elementNumber');

  // Retrieve film file and necessary data
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  let { nonSpeakers, characterList } = filmFoxFile;

  // Sort nonSpeakers and characterList arrays
  nonSpeakers.sort();
  characterList.sort();

  // Render the characters template with necessary data
  res.render('characters.njk', {
    title,
    characters: characterList,
    page: 'Characters',
    caller: 'characters',
    nonSpeakers,
    sceneNumber,
    elementNumber,
  });
};

module.exports = { charactersHandler };
