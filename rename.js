const { getFileList, getData, writeFile } = require("./services/file-service");
const fs = require("fs");
const path = require("path");

const main = async () => {
  const directoryPath = path.join(__dirname, `./data/Satellite/sounds`);

  const list = await getFileList("./data/Satellite/sounds", "mp3");
  const filmFoxFile = await getData(`Satellite/Satellite.fff`);
  const { script } = filmFoxFile;

  let menu = [];

  list.forEach((l, index) => {
    let sc = "0000" + script[index].scene;
    sc = sc.substring(sc.length - 4);
    let num = "0000" + index;
    num = num.substring(num.length - 4);
    const newFile = `${sc}_${num}.mp3`;
    script[index].sound = newFile;
  });
  await writeFile(JSON.stringify(filmFoxFile), 'xxxxSatellite.fff');

};

main();
