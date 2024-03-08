'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile, getFileList } = require('../../services/file-service');

/**
 * Handles requests related to the showreel.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const showreelHandler = async (req, res) => {
  // Log entering the showreel handler
  smartLog('info', 'ENTERING SHOWREEL HANDLER');

  // Parse URL parameters
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  let sceneNumber = parseInt(u.query.sceneNumber) || 0;
  let elementNumber = parseInt(u.query.elementNumber) || 0;
  let mute = u.query.mute || 'MUTE';
  const msg = u.query.msg;


  // Ensure sceneNumber and elementNumber are within valid ranges
  const { script, shotList, charactersByScene, nonSpeakers, characterList } = await getFile(`${title}/${title}.fff`);
  sceneNumber = Math.max(0, Math.min(sceneNumber, script.length - 1));

  // Handle decrement of elementNumber
  if (elementNumber < 0) {
    sceneNumber--;
    elementNumber = script[sceneNumber].length - 1;
  }

  // Ensure sceneNumber is not negative
  sceneNumber = Math.max(0, sceneNumber);

  // Ensure elementNumber is within valid range
  if (elementNumber > script[sceneNumber].length - 1) {
    elementNumber = 0;
  }

  // Retrieve element details from the script
  const element = script[sceneNumber][elementNumber];
  const slug = script[sceneNumber][0].dialogue;

  // Generate file name for audio based on scene and element numbers
  let num = `0000${sceneNumber}`.slice(-4);
  let sub = `0000${elementNumber}`.slice(-4);
  const fileName = `${num}_${sub}.mp3`;

  // Retrieve list of sound files for the specified title
  const soundsList = await getFileList(`data/${title}/sound/sounds`, 'mp3');

  let audio = '';
  let audioComplete = 'yes';

  // Check if the generated audio file exists in the sound list
  if (soundsList.includes(fileName)) {
    audio = `../data/${title}/sound/sounds/${fileName}`;
    element.sound = fileName;
  } else {
    element.sound = '';
    audioComplete = 'no';
  }

  // Extract characters excluding NARRATOR and non-speakers
  let chars = characterList
    .filter((c) => c[0] !== 'NARRATOR')
    .map((c) => c[0])
    .concat(nonSpeakers);

  // Remove characters present in the current scene
  if (charactersByScene[sceneNumber]) {
    charactersByScene[sceneNumber].forEach((c) => {
      const pointer = chars.indexOf(c);
      if (pointer !== -1) {
        chars.splice(pointer, 1);
      }
    });
  }

  // Set the voice for the current element
  characterList.forEach((c) => {
    if (c[0] === element.character.toUpperCase()) {
      element.voice = c[1];
    }
  });

  // Extract noteList and slugList from the script
  const noteList = script.map((s) => s.note + '@@');
  const slugList = script.map((s) => s[0].dialogue + '@@');

  // Render the showreel page with relevant data
  res.render('showreel/showreel.njk', {
    sceneNumber,
    elementNumber,
    highestElement: script[sceneNumber].length - 1,
    highestScene: script.length - 1,
    title,
    element,
    mute,
    slug,
    page: 'Showreel',
    caller: 'showreel',
    audio,
    note: shotList[sceneNumber].note,
    parenthetical: element.parenthetical,
    characterList: charactersByScene[sceneNumber].sort(),
    characters: chars.sort(),
    voice: element.voice,
    slugList,
    noteList,
    msg,
    audioComplete,
  });
};

module.exports = { showreelHandler };
