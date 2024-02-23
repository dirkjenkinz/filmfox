'use strict';

const url = require('url');
const { playSoundFile } = require('../services/file-service');
const dotenv = require('dotenv');
dotenv.config();
const { smartLog } = require('../services/smart-log');

const playMasterHandler = async (req, res) => {
  try {
    smartLog('info', 'ENTERING PLAY MASTER HANDLER');
    
    const u = url.parse(req.originalUrl, true);
    const sceneNumber = u.query.sceneNumber;
    const title = u.query.title;

    // Play the master audio file
    await playSoundFile(title, 'master.mp3', 'sound/scenes');

    // Redirect to the /sound page after a delay
    setTimeout(function () {
      res.redirect(`/sound?title=${title}&sceneNumber=${sceneNumber}`);
    }, 5000);
  } catch (error) {
    // Log and handle errors
    smartLog('error', 'Error in playMasterHandler:', error);
    
    // Optionally, send an error response to the client or take appropriate actions
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { playMasterHandler };
