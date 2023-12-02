'use strict';

const url = require('url');
const { smartLog } = require('../services/smart-log');
const { getFile, writeFile } = require('../services/file-service');

const resetOrder = ((length) => {
  const newSceneOrder = [];
  for (let i = 0; i < length; i++){
    newSceneOrder.push(i);
  };
  console.log({newSceneOrder});
  return newSceneOrder;
});

const changeSceneOrderHandler = async (req, res) => {
  smartLog('info', 'ENTERING CHANGE SCENE ORDER HANDLER');
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const from = u.query.from;
  const to = u.query.to;
  const scr1 = u.query.scr1;
  const reset = u.query.reset;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  let { sceneOrder } = filmFoxFile;
  console.log({reset});

  if (reset === 'yes'){
    filmFoxFile.sceneOrder = resetOrder(sceneOrder.length);
  } else {
  if (parseInt(from) > parseInt(to)) {
    const hold = sceneOrder[parseInt(from)];
    sceneOrder.splice(from, 1);

    const newSceneOrder = [
      ...sceneOrder.slice(0, to),
      hold,
      ...sceneOrder.slice(to)
    ];
    filmFoxFile.sceneOrder = newSceneOrder;
  };


  if (parseInt(from) < parseInt(to)) {
    const newSceneOrder = [
      ...sceneOrder.slice(0, to),
      sceneOrder[parseInt(from)],
      ...sceneOrder.slice(to)
    ];
    newSceneOrder.splice(parseInt(from), 1);

    filmFoxFile.sceneOrder = newSceneOrder;
  };
};

  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
  res.redirect(`/scene-arranger?title=${title}&elementNumber=0&sceneNumber=0&scr1=${scr1}`);
};

module.exports = { changeSceneOrderHandler };
