'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile, writeFile } = require('../../services/file-service');

/**
 * Handles requests to update shot list.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateShotListHandler = async (req, res) => {
  smartLog('info', 'ENTERING UPDATE SHOTLIST HANDLER');

  // Parse URL parameters
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const val = u.query.val;
  const item = u.query.item;
  const line = u.query.line;

  // Retrieve filmFoxFile and shotList from the file
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { shotList } = filmFoxFile;

  // Update the specified item in the shot list
  shotList[sceneNumber].lines[line][item] = val;

  // Write the updated filmFoxFile back to the file system
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  // Redirect to the scene shot list
  res.redirect(`/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}`);
};

module.exports = { updateShotListHandler };
