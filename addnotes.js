const { readFile, writeFile } = require('./services/file-service');
const title='Satellite'
const main = async () => {
let filmFoxFile = await readFile(`${title}/${title}.fff`);  
let {script} = filmFoxFile;

script.forEach(s => {
    if (s.slug === 'yes'){
        s.note = '';
    }
});

await writeFile(JSON.stringify(filmFoxFile), `${title}/${title}.fff`);
}

main();