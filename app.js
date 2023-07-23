const express = require('express');
const app = express();
const frontRouter = require('./routes/front.js');
const displayRouter = require('./routes/display.js');
const convertRouter = require('./routes/convert.js');
const characterToVoiceRouter = require('./routes/character-to-voice.js');
const characterUpdateRouter = require('./routes/character-update.js');
const generateSingleRouter = require('./routes/generate-single.js');

const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

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

app.listen(PORT, (err) => {
    console.log(`FilmFox is up & running on port ${PORT}`);
});
