const { getData, writeFile } = require('./services/file-service');

const shot = async () => {
   const shotList = []
    const line = 
        {
          shot: "-",
          angle: "-",
          move: "-",
          audio: "-",
          subject: "",
          description: "",
        };
    let filmFoxFile = await getData(`Satellite/Satellite.fff`);

    const {script} = filmFoxFile;
    const top = script[script.length -1].scene;
    for (let i = 0; i <= top; i++){
        shotList.push({scene: i, lines: [line, line]});
    };
    filmFoxFile.shotList = shotList;

    await writeFile(JSON.stringify(filmFoxFile), `Satellite/Satellite.fff`);
    
};

shot();