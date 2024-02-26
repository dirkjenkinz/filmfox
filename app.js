// Import required modules
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const { smartLog } = require('./services/smart-log.js');

// Create an Express application
const app = express();

// Configure Nunjucks for template rendering
nunjucks.configure('pages', {
    autoescape: true,
    express: app
});

// Set up middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the port for the server
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname + '/'));

// Define routers for each endpoint
const routers = {
    '/': require('./routes/front.js'),
    '/front': require('./routes/front.js'),
    '/convert': require('./routes/convert.js'),
    '/ctv': require('./routes/character-to-voice.js'),
    '/character-update': require('./routes/character-update.js'),
    '/generate-single': require('./routes/generate-single.js'),
    '/delete': require('./routes/delete.js'),
    '/gallery': require('./routes/gallery.js'),
    '/update-image-display': require('./routes/update-image-display.js'),
    '/showreel': require('./routes/showreel.js'),
    '/sound': require('./routes/sound.js'),
    '/concatenate-sound': require('./routes/concatenate-sound.js'),
    '/master': require('./routes/master.js'),
    '/play-master': require('./routes/play-master.js'),
    '/video': require('./routes/video.js'),
    '/create-video': require('./routes/create-video.js'),
    '/characters': require('./routes/characters.js'),
    '/edit-character': require('./routes/edit-character.js'),
    '/voices': require('./routes/voices.js'),
    '/get-samples': require('./routes/get-samples.js'),
    '/scene-shot-list': require('./routes/scene-shot-list.js'),
    '/update-shot-list': require('./routes/update-shot-list.js'),
    '/add-shot': require('./routes/add-shot.js'),
    '/delete-shot': require('./routes/delete-shot.js'),
    '/update-note': require('./routes/update-note.js'),
    '/scene-arranger': require('./routes/scene-arranger.js'),
    '/change-scene-order': require('./routes/change-scene-order.js'),
    '/sheets': require('./routes/sheets.js'),
    '/credits': require('./routes/credits.js'),
    '/update-credits': require('./routes/update-credits.js'),
    '/add-character': require('./routes/add-character.js'),
    '/add-character-to-scene': require('./routes/add-character-to-scene.js'),
    '/delete-character-from-scene': require('./routes/delete-character-from-scene.js'),
    '/delete-character': require('./routes/delete-character.js'),
    '/breakdown': require('./routes/breakdown.js'),
    '/render-breakdown': require('./routes/render-breakdown.js'),
    '/breakdown-report': require('./routes/breakdown-report.js'),
    '/full-shot-list': require('./routes/full-shot-list.js'),
    '/add-category': require('./routes/add-category.js'),
    '/delete-category': require('./routes/delete-category.js'),
    '/categories': require('./routes/categories.js'),
    '/compile-scene': require('./routes/compile-scene.js'),
    '/concatenate-video': require('./routes/concatenate-video.js'),
    '/create-powerpoint': require('./routes/create-powerpoint.js'),
    '/show-gallery': require('./routes/show-gallery.js'),
    '/delete-image': require('./routes/delete-image.js'),
    '/rename-image': require('./routes/rename-image.js'),
    '/generate-scene': require('./routes/generate-scene.js'),
    '/slideshow': require('./routes/slideshow.js'),
    '/generate-paperwork': require('./routes/generate-paperwork.js'),
    '/update-api-key': require('./routes/update-api-key.js'),
    '/generate-category-pdfs': require('./routes/generate-category-pdfs.js'),
    '/generate-category-spreadsheets': require('./routes/generate-category-spreadsheets.js'),
    '/generate-sheet-pdfs': require('./routes/generate-sheet-pdfs.js'),
    '/generate-shot-pdfs': require('./routes/generate-shot-pdfs.js'),
    '/generate-shot-spreadsheets': require('./routes/generate-shot-spreadsheets.js'),
};

// Attach each router to its corresponding endpoint
for (const [endpoint, router] of Object.entries(routers)) {
    app.use(endpoint, router);
}

// Start the server and log a message on success
app.listen(PORT, (err) => {
    smartLog('paramount', `FilmFox is up & running on port ${PORT}`);
});
