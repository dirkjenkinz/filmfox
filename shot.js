const { readFile, writeFile } = require('./services/file-service');

const shot = async () => {
    let filmFoxFile = await readFile(`Satellite/Satellite.fff`);
    const {shotList} = filmFoxFile;
    shotList.forEach((s) => {
        s.note = '';
    });
   
    await writeFile(JSON.stringify(filmFoxFile), `Satellite/Satellite.fff`);
    
};

shot();