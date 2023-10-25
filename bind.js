"use strict";
const { smartLog } = require("./services/smart-log");
const { readFile } = require("./services/file-service");

const main = async () => {
  const filmFoxFile = await readFile("Satellite/Satellite.fff");
  const { script } = filmFoxFile;
  const dax = await readFile("Dax/Dax.fff");
  const dScript = dax.script;

  for (let i = 0; i < script.length; i++) {
    for (let j = 0; j < script[i].length; j++) {
      console.log(i, j, dScript[i][j].dialogue);
      console.log(i, j, script[i][j].dialogue);
    }
  }
};

main();
