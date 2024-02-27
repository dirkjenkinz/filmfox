'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile, writeFile } = require('../../services/file-service');

// Function to reset scene order based on length
const resetOrder = (length) => {
  const newSceneOrder = [];
  for (let i = 0; i < length; i++) {
    newSceneOrder.push(i);
  }
  return newSceneOrder;
};

// Handler function to change the scene order
const changeSceneOrderHandler = async (req, res) => {
  // Log entering the scene order change handler
  smartLog('info', 'ENTERING CHANGE SCENE ORDER HANDLER');

  // Parse the URL to extract query parameters
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const from = u.query.from;
  const to = u.query.to;
  const scr1 = u.query.scr1;
  const reset = u.query.reset;

  // Retrieve film file and necessary data
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  let { sceneOrder } = filmFoxFile;

  // Check if reset is requested
  if (reset === 'yes') {
    filmFoxFile.sceneOrder = resetOrder(sceneOrder.length);
  } else {
    // Change scene order based on 'from' and 'to' parameters
    if (parseInt(from) > parseInt(to)) {
      const hold = sceneOrder[parseInt(from)];
      sceneOrder.splice(from, 1);

      const newSceneOrder = [
        ...sceneOrder.slice(0, to),
        hold,
        ...sceneOrder.slice(to)
      ];
      filmFoxFile.sceneOrder = newSceneOrder;
    }

    if (parseInt(from) < parseInt(to)) {
      const newSceneOrder = [
        ...sceneOrder.slice(0, to),
        sceneOrder[parseInt(from)],
        ...sceneOrder.slice(to)
      ];
      newSceneOrder.splice(parseInt(from), 1);

      filmFoxFile.sceneOrder = newSceneOrder;
    }
  }

  // Write the updated file back
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  // Redirect to scene arranger with necessary parameters
  res.redirect(`/scene-arranger?title=${title}&elementNumber=0&sceneNumber=0&scr1=${scr1}`);
};

// Export the handler function
module.exports = { changeSceneOrderHandler };
