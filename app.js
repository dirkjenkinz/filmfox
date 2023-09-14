const express = require('express');
const app = express();
const frontRouter = require('./routes/front.js');
const displayRouter = require('./routes/display.js');
const convertRouter = require('./routes/convert.js');
const characterToVoiceRouter = require('./routes/character-to-voice.js');
const characterUpdateRouter = require('./routes/character-update.js');
const generateSingleRouter = require('./routes/generate-single.js');
const playRouter = require('./routes/play.js');
const srtRouter = require('./routes/srt.js');
const deleteRouter = require('./routes/delete.js');
const galleryRouter = require('./routes/gallery.js');
const updateImageDisplayRouter = require('./routes/update-image-display.js');
const buildShowreelRouter = require('./routes/build-showreel.js');
const playShowreelRouter = require('./routes/play-showreel.js');
const mergeRouter = require('./routes/merge.js');
const concatRouter = require('./routes/concat.js');
const videoRouter = require('./routes/video.js');
const masterRouter = require('./routes/master.js');
const playMasterRouter = require('./routes/play-master.js');


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
app.use('/play', playRouter);
app.use('/srt', srtRouter);
app.use('/delete', deleteRouter);
app.use('/gallery', galleryRouter);
app.use('/update-image-display', updateImageDisplayRouter);
app.use('/build-showreel', buildShowreelRouter);
app.use('/play-showreel', playShowreelRouter);
app.use('/merge', mergeRouter);
app.use('/concat', concatRouter);
app.use('/video', videoRouter);
app.use('/master', masterRouter);
app.use('/play-master', playMasterRouter);

app.listen(PORT, (err) => {
    smartLog('paramount', `FilmFox is up & running on port ${PORT}`);
});
