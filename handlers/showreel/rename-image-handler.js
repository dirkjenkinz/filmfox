'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { renameFile, getFile, writeFile } = require('../../services/file-service');

const renameImageHandler = async (req, res) => {
  try {
    smartLog('info', 'ENTERING RENAME IMAGE HANDLER');

    const u = url.parse(req.originalUrl, true);
    const title = u.query.title;
    const sceneNumber = u.query.sceneNumber;
    const elementNumber = u.query.elementNumber;
    const from = u.query.from;
    let to = u.query.to;
    const scr1 = u.query.scr1;

    // Validate input parameters
    if (!from || !to) {
      throw new Error('Invalid parameters for renaming image.');
    }

    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    let { script } = filmFoxFile;

    const fileType = from.substring(from.indexOf('.'));
    to += fileType;

    // Rename the image file
    await renameFile(title, 'vision/images', from, to);

    // Update references to the file in the script
    script.forEach((element) => {
      element.forEach((e) => {
        if (e.image === from) {
          e.image = to;
        }
      });
    });

    // Save the updated script to the file
    await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

    // Redirect to the show-gallery page
    res.redirect(`/show-gallery?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}&scr1=${scr1}`);
  } catch (error) {
    // Handle errors
    smartLog('error', 'Error in renameImageHandler:', error);

    // Optionally, send an error response to the client or take appropriate actions
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { renameImageHandler };
