const { readFile, writeFile } = require("./services/file-service");
const smartLog = require("./services/smart-log");

const main = async () => {
  let filmFoxFile = await readFile("/Satellite/Satellite.fff");
  let { script } = filmFoxFile;

  filmFoxFile.nonSpeaking = [];


  await writeFile(JSON.stringify(filmFoxFile), "Satellite/Satellite.fff");
};

main();
