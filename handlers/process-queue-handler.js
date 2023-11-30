'use strict';

const url = require('url');
const { getFile, getFileList, writeFile } = require('../services/file-service');
const dotenv = require('dotenv');
dotenv.config();
const { smartLog } = require('../services/smart-log');

const processQueueHandler = async (req, res) => {
  smartLog('info', 'ENTERING PROCESS QUEUE HANDLER');
  let u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  let { queue } = filmFoxFile;

  const sceneNumber = queue[0][0];
  const elementNumber = queue[0][1];
  const character = queue[0][2];
  const voice = queue[0][3];

  console.log(queue, 1);
  const newQueue = [];
  for (let i = 1; i < queue.length; i++) {
    newQueue.push(queue[i]);
  };
  filmFoxFile.queue = newQueue;
  console.log('2', { queue }, queue.length);;

  let caller = 'process-queue';
  if (filmFoxFile.queue.length === 0) caller = 'sound';
  await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);

  res.redirect(`/generate-single?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&character=${character}&voice=${voice}&caller=${caller}`);
};

module.exports = { processQueueHandler };
