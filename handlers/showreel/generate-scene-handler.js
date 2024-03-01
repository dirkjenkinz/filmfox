'use strict';

const url = require('url');
const path = require('path');
const { smartLog } = require('../../services/smart-log');
const { getFile } = require('../../services/file-service');
const videoStitch = require('video-stitch');
const videoConcat = videoStitch.concat;

// Handler for generating scenes based on the script
const generateSceneHandler = async (req, res) => {
  try {
    // Log entry point for better traceability
    smartLog('info', 'ENTERING GENERATE SCENE HANDLER');

    // Parse query parameters from the request URL
    const u = url.parse(req.originalUrl, true);
    const title = u.query.title;

    // Error handling for missing or invalid title
    if (!title) {
      throw new Error('Invalid or missing title in the query parameters.');
    }

    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    const { script } = filmFoxFile;
    const sceneNumber = u.query.sceneNumber;
    const videoPath = path.join(__dirname, `../../data/${title}/vision/videos`);
    const scenesPath = path.join(__dirname, `../../data/${title}/vision/scenes`);
    const blank = path.join(__dirname, '../../blank.mp4');

    // Determine the range of scenes to generate based on the 'sceneNumber' parameter
    let start, end;
    if (sceneNumber === 'all') {
      start = 0;
      end = script.length;
    } else {
      start = sceneNumber;
      end = parseInt(sceneNumber) + 1;
    }
    // Iterate through the specified scenes and generate videos
    for (let scene = start; scene < end; scene++) {   
      console.log('>>>>', scene);
      try {
        let sc = '0000' + scene;
        sc = sc.substring(sc.length - 4);
        const videoList = [];
console.log({sc})
        // Build a list of video clips for the scene
        for (let element = 0; element < script[scene].length; element++) {
          let el = '0000' + element;
          el = el.substring(el.length - 4);
          videoList.push({ 'fileName': `${videoPath}/${sc}_${el}.mp4` });
        }

        // Add blank videos to the end of the list for transitions
        videoList.push({ 'fileName': blank });
        videoList.push({ 'fileName': blank });

        // Define the output file path for the scene
        const outputFile = `${scenesPath}/${sc}.mp4`;
console.log(scenesPath);
        // Use video-stitch library to concatenate video clips and generate the scene
        await videoConcat({
          silent: true,
          overwrite: true
        })
          .clips(videoList)
          .output(outputFile)
          .concat();

        // Log information about the created scene
        smartLog('info', `${outputFile} - created`);
      } catch (error) {
        // Handle errors during scene generation
        smartLog('error', `Error generating scene ${scene}: ${error.message}`);
      }
    }

    // Redirect to the 'video' page with updated query parameters
    res.redirect(`/video?title=${title}&sceneNumber=0`);
  } catch (error) {
    // Handle top-level errors
    smartLog('error', `Error in generateSceneHandler: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
};

// Export the generateSceneHandler function for use in other modules
module.exports = { generateSceneHandler };
