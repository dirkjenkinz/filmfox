const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const join = async () => {
  const dp = path.join(__dirname, "./data/Satellite/videos");
  const fourth = `${dp}/0001_0003.mp4`;
  const fifth = `${dp}/0001_0007.mp4`;

  ffmpeg({source: fourth})
  .input(fifth)
  .on('end', ()=>{
    console.log('done')
  })
  .on('error', (err) => console.log('Err:', err))
  .mergeToFile(`${dp}/aaaaa.mp4`)
};

join();
