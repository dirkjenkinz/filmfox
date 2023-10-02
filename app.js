const express = require('express');
const app = express();
const frontRouter = require('./routes/front.js');
const displayRouter = require('./routes/display.js');
const convertRouter = require('./routes/convert.js');
const characterToVoiceRouter = require('./routes/character-to-voice.js');
const characterUpdateRouter = require('./routes/character-update.js');
const generateSingleRouter = require('./routes/generate-single.js');
const deleteRouter = require('./routes/delete.js');
const galleryRouter = require('./routes/gallery.js');
const updateImageDisplayRouter = require('./routes/update-image-display.js');
const buildShowreelRouter = require('./routes/build-showreel.js');
const playShowreelRouter = require('./routes/play-showreel.js');
const mergeRouter = require('./routes/merge.js');
const concatRouter = require('./routes/concat.js');
const masterRouter = require('./routes/master.js');
const playMasterRouter = require('./routes/play-master.js');
const videoRouter = require('./routes/video.js');
const createVideoRouter = require('./routes/create-video.js');
const scenesRouter = require('./routes/scenes.js');
const editSceneRouter = require('./routes/edit-scene.js');
const charactersRouter = require('./routes/characters.js');
const editCharacterRouter = require('./routes/edit-character.js');
const voicesRouter = require('./routes/voices.js');
const getSamplesRouter = require('./routes/get-samples.js');
const backToScenesRouter = require('./routes/back-to-scenes.js');

const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

const { smartLog } = require('./services/smart-log.js');

nunjucks.configure('pages', {
    autoescape: true,
    express: app
});

app.use(express.static(__dirname + '/'));

app.use('/', frontRouter);
app.use('/front', frontRouter);
app.use('/display', displayRouter);
app.use('/convert', convertRouter);
app.use('/ctv', characterToVoiceRouter);
app.use('/character-update', characterUpdateRouter);
app.use('/generate-single', generateSingleRouter);
app.use('/delete', deleteRouter);
app.use('/gallery', galleryRouter);
app.use('/update-image-display', updateImageDisplayRouter);
app.use('/build-showreel', buildShowreelRouter);
app.use('/play-showreel', playShowreelRouter);
app.use('/merge', mergeRouter);
app.use('/concat', concatRouter);
app.use('/master', masterRouter);
app.use('/play-master', playMasterRouter);
app.use('/video', videoRouter);
app.use('/create-video', createVideoRouter);
app.use('/scenes', scenesRouter);
app.use('/edit-scene', editSceneRouter);
app.use('/characters', charactersRouter);
app.use('/edit-character', editCharacterRouter);
app.use('/voices', voicesRouter);
app.use('/get-samples', getSamplesRouter);
app.use('/back-to-scenes', backToScenesRouter);

app.listen(PORT, (err) => {
    smartLog('paramount', `FilmFox is up & running on port ${PORT}`);
});
