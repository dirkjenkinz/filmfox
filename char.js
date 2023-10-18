const { readFile, writeFile } = require("./services/file-service");
const smartLog = require("./services/smart-log");

const main = async () => {
  let filmFoxFile = await readFile("/Satellite/Satellite.fff");
  let { script } = filmFoxFile;
  const newScript = script;
  const charactersByScene = [];

  script.forEach((scene, scIndex) => {
    let characterList = [];

    scene.forEach((element, elIndex) => {
      if (element.character !== "NARRATOR") {
        characterList.push(element.character);
      }
    });

    characterList = characterList.filter(function (item, pos) {
      return characterList.indexOf(item) == pos;
    });
    charactersByScene.push(characterList)

  });

  filmFoxFile.charactersByScene = charactersByScene;

  await writeFile(JSON.stringify(filmFoxFile), "Satellite/Satellite.fff");
};

main();
