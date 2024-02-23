'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, getFileList } = require('../services/file-service');

// Handler for editing a character
const editCharacterHandler = async (req, res) => {
  // Log entry point for better traceability
  smartLog('info', 'ENTERING EDIT CHARACTER HANDLER');

  // Parse query parameters from the request URL
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const msg = u.query.msg;
  const character = u.query.character;

  try {
    // Fetch movie file information asynchronously
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    const { characterList, script } = filmFoxFile;

    const elements = [];

    // Iterate through the script to find elements related to the specified character
    script.forEach((s, sceneIndex) => {
      s.forEach((element, elementIndex) => {
        if (element.character === character) {
          elements.push({
            sceneNumber: sceneIndex,
            dialogue: element.dialogue,
            elementNumber: elementIndex,
            voice: element.voice,
          });
        }
      });
    });

    // Fetch the list of sound files associated with the specified title
    const soundFiles = await getFileList(`data//${title}/sound/sounds`, 'mp3');

    // Determine if a sound file exists for each element
    elements.forEach((e) => {
      const num = '0000' + e.sceneNumber;
      const sceneNum = num.substring(num.length - 4);
      const sub = '0000' + e.elementNumber;
      const subNum = sub.substring(sub.length - 4);
      const fileName = `${sceneNum}_${subNum}.mp3`;

      // Check if the sound file exists for the element
      e.sound = soundFiles.includes(fileName) ? fileName : '';
    });

    // Find the current voice of the character
    const currentVoice = characterList.find((c) => c[0] === character)?.[1] || '';

    // Render the 'edit-character' template with relevant data
    res.render('edit-character.njk', {
      character,
      title,
      elements,
      currentVoice,
      page: 'Edit Character',
      caller: 'edit-character',
      msg,
      sceneNumber,
      elementNumber,
    });
  } catch (error) {
    // Log any errors that occur during file handling
    smartLog('error', `Error editing character: ${error.message}`);

    // Send an internal server error response if an error occurs
    res.status(500).send('Internal Server Error');
  }
};

// Export the editCharacterHandler function for use in other modules
module.exports = { editCharacterHandler };
