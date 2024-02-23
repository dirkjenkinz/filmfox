'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile } = require('../services/file-service');

// Handler for rendering the full shot list
const fullShotListHandler = async (req, res) => {
  // Log entry point for better traceability
  smartLog('info', 'ENTERING FULL SHOT LIST HANDLER');

  // Parse query parameters from the request URL
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  let hidden = u.query.hidden;
  const elementNumber = u.query.elementNumber;
  const sceneNumber = u.query.sceneNumber;

  try {
    // Fetch movie file information asynchronously
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    const { shotList, script, sceneOrder, credits } = filmFoxFile;

    // Initialize default values for 'top' and 'hidden' if not provided
    let top = parseInt(u.query.top) || 1;

    if (!hidden) {
      hidden = new Array(shotList.length).fill('false');
    } else {
      hidden = hidden.split(',');
    }

    const slugs = script.map((s) => s[0].dialogue);

    // Build shotList and slugList based on scene order
    const sList = sceneOrder.map((sceneNumber) => shotList[sceneNumber]);
    const slugList = sceneOrder.map((sceneNumber) => slugs[sceneNumber]);

    // Calculate finish index based on 'top'
    let finish = 16 + top;
    finish = Math.min(finish, shotList.length - 1);
    finish = Math.max(finish, top);

    // Render the 'full-shot-list' template with relevant data
    res.render('full-shot-list.njk', {
      title,
      shotList: sList.slice(top - 1, finish),
      slugList: slugList.slice(top - 1, finish),
      page: 'Full Shot List',
      caller: 'full-shot-list',
      size: shotList.length,
      realTitle: credits.title,
      elementNumber,
      sceneNumber,
    });
  } catch (error) {
    // Log any errors that occur during file handling
    smartLog('error', `Error handling full shot list: ${error.message}`);

    // Send an internal server error response if an error occurs
    res.status(500).send('Internal Server Error');
  }
};

// Export the fullShotListHandler function for use in other modules
module.exports = { fullShotListHandler };
