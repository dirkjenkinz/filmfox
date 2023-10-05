const { readFile, writeFile } = require('./services/file-service');

const shot = async () => {
    let sceneOrder = [];
   
    const filmFoxFile = await readFile(`Satellite/Satellite.fff`);
    const {shotList} = filmFoxFile;
    for (let i = 0; i < shotList.length; i++){
        sceneOrder.push(i);
    };

    filmFoxFile.sceneOrder = sceneOrder;
    await writeFile(JSON.stringify(filmFoxFile), `Satellite/Satellite.fff`);
};

shot();