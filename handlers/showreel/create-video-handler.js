'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile } = require('../../services/file-service');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

/**
 * Converts an image and sound to an MP4 video.
 *
 * @param {string} sound - Path to the sound file.
 * @param {string} image - Path to the image file.
 * @param {string} output - Output path for the video.
 * @returns {Promise<void>} - Promise indicating the completion of the conversion.
 */
const imgToMP4 = (sound, image, output) => {
  return new Promise((resolve, reject) => {
    // Using fluent-ffmpeg library for video conversion
    ffmpeg()
      .input(image)
      .input(sound)
      .inputFPS(1)
      .outputFPS(25)
      .audioCodec('aac')
      .audioBitrate(128)
      .videoBitrate('128k')
      .videoCodec('libx264')  // Use libx264 for better compatibility
      .size('720x?')
      .aspect('16:9')
      .format('mp4')
      .output(output)
      .on('end', function () {
        // Video conversion completed successfully
        smartLog('info', `${output} created`);
        resolve();
      })
      .on('error', function (err) {
        // Error during video conversion
        smartLog('error', `Error converting ${image}: ${err.message}`);
        reject(err);
      })
      .run();
  });
};

/**
 * Handles the creation of a video by converting images and sounds for a scene.
 *
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @returns {Promise<void>} - Promise indicating the completion of the handler.
 */
const createVideoHandler = async (req, res) => {
  smartLog('info', 'ENTERING CREATE VIDEO HANDLER');
  try {
    // Extracting parameters from the request URL
    const u = url.parse(req.originalUrl, true);
    const title = u.query.title;
    const sceneNumber = u.query.sceneNumber;
    const soundPath = path.join(__dirname, `../../data/${title}/sound/sounds`);
    const imagePath = path.join(__dirname, `../../data/${title}/vision/images`);
    const outPath = path.join(__dirname, `../../data/${title}/vision/videos`);

    // Retrieving script information from the film file
    const filmFoxFile = await getFile(`${title}/${title}.fff`);
    smartLog('info', `${title}.fff retrieved`);
    const { script } = filmFoxFile;

    // Extracting the specified scene from the script
    const scene = script[sceneNumber];

    // Use for...of loop to ensure proper ordering of asynchronous tasks
    for (const [index, s] of scene.entries()) {
      // Formatting the file names with padding
      let num = '0000' + sceneNumber;
      num = num.substring(num.length - 4);
      let sub = '0000' + index;
      sub = sub.substring(sub.length - 4);
      const fileName = `${num}_${sub}.mp3`;
      const sound = `${soundPath}/${fileName}`;
      const image = `${imagePath}/${s.image}`;
      const output = `${outPath}/${num}_${sub}.mp4`;

      // Await the conversion before moving to the next iteration
      await imgToMP4(sound, image, output);
    }

    // Redirecting to the video page after successful conversion
    res.redirect(`/video?title=${title}&sceneNumber=${sceneNumber}`);
  } catch (error) {
    // Handling errors and sending a 500 Internal Server Error response
    smartLog('error', `Error in createVideoHandler: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { createVideoHandler };
