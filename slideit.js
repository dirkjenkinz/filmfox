var videoshow = require('videoshow');
const path = require("path");
const title = 'Satellite'

const dirPath = path.join(__dirname, `./data/${title}/images`);



const images = [
  `${dirPath}/shed02.jpg`
]

const videoOptions = {
  fps: 25,
  loop: 5, // seconds
  transition: true,
  transitionDuration: 1, // seconds
  videoBitrate: 1024,
  videoCodec: 'libx264',
  size: '1200x?',
  audioBitrate: '128k',
  audioChannels: 2,
  format: 'mp4',
  pixelFormat: 'yuv420p'
}

videoshow(images, videoOptions)
  .audio('jesusLovesMe.wav')
  .save(`${dirPath}/satslide.mp4`)
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.error('Video created in:', output)
  })