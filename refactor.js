const { readFile, writeFile } = require("./services/file-service");

const ref = async () => {

  const filmFoxFile = await readFile(`Satellite/Satellite.fff`);
  let { script, title, api_key, voice_data, shotList, sceneOrder } = filmFoxFile;

  const newScript = [];
  script.forEach((s) => {
    if (s.slug === "yes") {
      sc1 = [];
      script.forEach((x) => {
        if (x.scene === s.scene) {
          sc1.push(x);
        }
      });
      newScript.push(sc1);
    }
  });

const ss = filmFoxFile;
const fff = {
  title,
  api_key,
  voice_data,
  script,
  shotList,
  sceneOrder,
};

  await writeFile(JSON.stringify(ss), `Satellite/Satellite.fff`);
};

ref();
