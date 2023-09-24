const path = require("path");
let videoStitch = require("video-stitch");
let videoConcat = videoStitch.concat;
const directoryPath = path.join(__dirname, "./data/Satellite/videos");
const outPath = path.join(__dirname, "./joined");
const output = `${outPath}/joined.mp4`;
const { getFileList } = require("./services/file-service");

const main = async () => {
  const files = await getFileList("data/Satellite/videos", "mp4");

  const input = [];

  files.forEach((f, index) => {
    if (index < 100) {
      input.push({ fileName: `${directoryPath}/${f}` });
    }
  });

  videoConcat({
    // ffmpeg_path: <path-to-ffmpeg> Optional. Otherwise it will just use ffmpeg on your $PATH
    silent: false, // optional. if set to false, gives detailed output on console
    overwrite: true, // optional. by default, if file already exists, ffmpeg will ask for overwriting in console and that pause the process. if set to true, it will force overwriting. if set to false it will prevent overwriting.
  })
    .clips(input)
    .output(output) //optional absolute file name for output file
    .concat()
    .then((output) => {
      console.log(`Output: ${output}`);
    });
};

main();
