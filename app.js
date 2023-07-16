const express = require('express');
const app = express();
const mainRouter = require('./routes/main.js');
const convertRouter = require('./routes/convert.js');
const voicesRouter = require('./routes/voices.js');
const testRouter = require('./routes/test.js');
const displayRouter = require('./routes/display.js');

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

app.use('/', mainRouter);
app.use('/main', mainRouter);
app.use('/convert', convertRouter);
app.use('/voices', voicesRouter);
app.use('/test', testRouter);
app.use('/display', displayRouter);

app.listen(PORT, (err) => {
    console.log(`FilmFox is up & running on port ${PORT}`);
});
