'use strict';

const fs = require('fs');
const path = require('path');
const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { registerFont } = require('canvas');

// Register fonts for better text rendering
registerFont('C:/Windows/Fonts/arialbd.ttf', { family: 'Arial Bold' });
registerFont('C:/Windows/Fonts/timesbd.ttf', { family: 'Times Bold' });

const {
  getFile,
  getDuration,
} = require('../../services/file-service');

// Handler function to build the showreel
const buildShowreelHandler = async (req, res) => {
  // Log entering the showreel building process
  smartLog('info', 'ENTERING BUILD SHOWREEL HANDLER');

  // Parse the URL to extract query parameters
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;

  // Retrieve the film script file
  const filmFoxFile = await getFile(`${title}/${title}.fff`);
  const { script } = filmFoxFile;

  // Array to store showreel information
  const showreel = [];

  // Iterate through the script and build the showreel
  await Promise.all(script.map(async (s, index) => {
    // Format scene and element numbers
    let sc = '0000' + sceneNumber;
    sc = sc.substring(sc.length - 4);
    let el = '0000' + index;
    el = el.substring(el.length - 4);

    // Construct the filename for the audio file
    const fileName = `${sc}_${el}.mp3`;

    // Get the duration of the audio file
    const duration = await getDuration(title, fileName);

    // Add entry to the showreel array
    showreel.push({
      duration: duration,
      character: s.character,
      dialogue: s.dialogue,
      image: s.image,
      sound: `../data/${title}/sound/sounds/${fileName}`,
      type: s.type,
      sceneNumber: s.scene,
    });
  }));

  // Log that the showreel has been built
  smartLog('info', 'showreel built');

  // Redirect to play-showreel with necessary parameters
  res.redirect(`/play-showreel?title=${title}&current=0&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`);
};

// Export the handler function
module.exports = { buildShowreelHandler };
