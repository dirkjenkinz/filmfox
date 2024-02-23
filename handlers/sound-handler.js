'use strict';

const url = require('url');
const { getFile, getFileList } = require('../services/file-service');
const { smartLog } = require('../services/smart-log');

/**
 * Retrieves the voice for a given character from the characterList.
 * @param {string} character - The character to find the voice for.
 * @param {Array} characterList - List of characters and their associated voices.
 * @returns {string} - The voice of the character.
 */
const getVoice = (character, characterList) => {
  let voice = '';
  characterList.forEach((c) => {
    if (c[0] === character) voice = c[1];
  });
  return voice;
};

/**
 * Prepares a list indicating whether each scene is ready.
 * @param {Array} script - List of scenes in the script.
 * @param {Array} soundsList - List of sound files.
 * @returns {Array} - Ready list for each scene.
 */
const prepareReadyList = (script, soundsList) => {
  let readyList = new Array(script.length).fill(0);

  soundsList.forEach((s) => {
    let scene = parseInt(s.substring(0, 4));
    readyList[scene]++;
  });

  readyList = readyList.map((count, index) => (count === script[index].length ? 'yes' : 'no'));

  return readyList;
};

/**
 * Handles requests related to sound.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const soundHandler = async (req, res) => {
  smartLog('info', 'ENTERING SOUND HANDLER');

  // Parse URL parameters
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const elementNumber = u.query.elementNumber;
  const sceneNumber = u.query.sceneNumber;

  // Retrieve file information from filmFoxFile
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script, characterList } = filmFoxFile;

  // Retrieve lists of merged scenes and sound files
  const mergedList = await getFileList(`data/${title}/sound/scenes`, 'mp3');
  const soundsList = await getFileList(`data/${title}/sound/sounds`, 'mp3');

  // Prepare ready lists
  const readyList = prepareReadyList(script, soundsList);

  // Check if all scenes are ready for mastering
  let readyForMaster = 'yes';
  if (readyList.includes('no')) {
    readyForMaster = 'no';
  }

  // Check if a master sound file exists
  const masterExists = mergedList.includes('master.mp3') ? 'yes' : 'no';

  // Check which scenes are merged
  const merged = script.map((_, index) => (mergedList.includes(`s${index.toString().padStart(5, '0')}.mp3`) ? 'yes' : 'no'));

  // Retrieve sound files and identify uncompiled list
  let soundFiles = await getFileList(`data/${title}/sound/sounds`, 'mp3');
  let uncompiledList = [];

  script.forEach((s, i) => {
    s.forEach((element, j) => {
      const sceneIndex = i.toString().padStart(4, '0');
      const elementIndex = j.toString().padStart(4, '0');
      const fileName = `${sceneIndex}_${elementIndex}.mp3`;

      if (!soundFiles.includes(fileName)) {
        uncompiledList.push([i, j, element.character, getVoice(element.character, characterList)]);
      }
    });
  });

  // Identify incomplete scenes
  let incomplete = [...new Set(uncompiledList.map((u) => u[0]))];

  // Prepare complete list
  const complete = new Array(script.length).fill('yes');
  uncompiledList.forEach((f) => {
    complete[f[0]] = 'no';
  });

  // Render the sound page with relevant data
  res.render('sound.njk', {
    title,
    merged,
    script,
    masterExists,
    page: 'Sound',
    caller: 'sound',
    size: script.length,
    readyList,
    elementNumber,
    sceneNumber,
    readyForMaster,
    uncompiledList,
    incomplete,
  });
};

module.exports = { soundHandler };
