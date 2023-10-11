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
const showreelRouter = require('./routes/showreel.js');
const soundRouter = require('./routes/sound.js');
const concatRouter = require('./routes/concat.js');
const masterRouter = require('./routes/master.js');
const playMasterRouter = require('./routes/play-master.js');
const videoRouter = require('./routes/video.js');
const createVideoRouter = require('./routes/create-video.js');
const scenesRouter = require('./routes/scenes.js');
const charactersRouter = require('./routes/characters.js');
const editCharacterRouter = require('./routes/edit-character.js');
const voicesRouter = require('./routes/voices.js');
const getSamplesRouter = require('./routes/get-samples.js');
const sceneShotListRouter = require('./routes/scene-shot-list.js');
const updateShotListRouter = require('./routes/update-shot-list.js');
const addShotRouter = require('./routes/add-shot.js');
const deleteShotRouter = require('./routes/delete-shot.js');
const updateNoteRouter = require('./routes/update-note.js');
const changeSceneOrderRouter = require('./routes/change-scene-order.js');
const sceneArrangerRouter = require('./routes/scene-arranger.js');
const sheetsRouter = require('./routes/sheets.js');
const pdfRouter = require('./routes/pdf.js');

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
app.use('/showreel', showreelRouter);
app.use('/sound', soundRouter);
app.use('/concat', concatRouter);
app.use('/master', masterRouter);
app.use('/play-master', playMasterRouter);
app.use('/video', videoRouter);
app.use('/create-video', createVideoRouter);
app.use('/scenes', scenesRouter);
app.use('/characters', charactersRouter);
app.use('/edit-character', editCharacterRouter);
app.use('/voices', voicesRouter);
app.use('/get-samples', getSamplesRouter);
app.use('/scene-shot-list', sceneShotListRouter);
app.use('/update-shot-list', updateShotListRouter);
app.use('/add-shot', addShotRouter);
app.use('/delete-shot', deleteShotRouter);
app.use('/delete-shot', deleteShotRouter);
app.use('/update-note', updateNoteRouter);
app.use('/scene-arranger', sceneArrangerRouter);
app.use('/change-scene-order', changeSceneOrderRouter);
app.use('/sheets', sheetsRouter);
app.use('/pdf', pdfRouter);

app.listen(PORT, (err) => {
    smartLog('paramount', `FilmFox is up & running on port ${PORT}`);
});
