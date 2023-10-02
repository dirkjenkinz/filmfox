const { getData, writeFile } = require("./services/file-service");
const  smartLog = require('./services/smart-log');

const main = async () => {
  const filmFoxFile = await getData("/Satellite/Satellite.fff");
  let { script } = filmFoxFile;
  const newScript = [];

  script.forEach((s) => {
    let type = "still";

    if (
      s[5].substring(s[5].length - 4) === ".mpg" ||
      s[5].substring(s[5].length - 4) === ".mov" ||
      s[5].substring(s[5].length - 4) === ".mp4" ||
      s[5].substring(s[5].length - 4) === ".avi"
    ) {
        type='movie';
    };

    let slug = 'no';

    if (s[0] === 'NARRATOR'){
      if (s[1].substring(0,3) === 'INT' || s[1].substring(0,3) === 'EXT'){
        slug = 'yes'
      }
    }

    newScript.push({
      character: s[0], 
      dialogue: s[1],                
      scene: s[2],
      voice: s[3],
      sound: s[4],
      image: s[5],
      duration: s[6],
      type: type,
      slug: slug
    });
  });
  filmFoxFile.script = newScript;

  await writeFile(JSON.stringify(filmFoxFile), 'Satellite/newSatellite.fff');

};

main();
