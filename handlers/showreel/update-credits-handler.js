'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile, writeFile } = require('../../services/file-service');

/**
 * Handles requests to update credits.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateCreditsHandler = async (req, res) => {
  smartLog('info', 'ENTERING UPDATE CREDIT HANDLER');

  // Parse URL parameters
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const val = u.query.val;
  const credit = u.query.credit;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;

  // Retrieve filmFoxFile and credits from the file
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  let { credits } = filmFoxFile;

  // Initialize credits if not present in the file
  if (!credits) {
    credits = {
      title: title,
      director: '',
      writer: '',
      producer: '',
    };
  }

  // Update the appropriate credit field based on the query parameter
  switch (credit) {
    case 'title':
      credits.title = val;
      break;
    case 'director':
      credits.director = val;
      break;
    case 'producer':
      credits.producer = val;
      break;
    case 'writer':
      credits.writer = val;
      break;
  }

  // Update the credits in filmFoxFile
  filmFoxFile.credits = credits;

  // Write the updated filmFoxFile back to the file system
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  // Redirect to the credits page with the appropriate parameters
  res.redirect(`/credits?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
};

module.exports = { updateCreditsHandler };
