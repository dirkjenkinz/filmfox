'use strict';

const url = require('url');
const { smartLog } = require('../../services/smart-log');
const { getFile, getFileList } = require('../../services/file-service');

/**
 * Handles requests related to voices.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const voicesHandler = async (req, res) => {
  smartLog('info', 'ENTERING VOICES HANDLER');

  // Parse URL parameters
  const u = url.parse(req.originalUrl, true);
  let scr1 = u.query.scr1 || 0;

  // Retrieve voices data and list of generated samples
  let voices = await getFile('voices.json');
  let generated = await getFileList('data/samples', 'mp3');

  // Default scr1 to 0 if not provided
  if (!scr1) scr1 = 0;

  // Check which voices have been generated
  const gen = voices.map((v) => (generated.includes(`${v.voice_id}.mp3`) ? 'yes' : 'no'));

  // Create an array of voice objects with additional properties
  let vox = voices.map((v, index) => ({
    id: v.voice_id,
    name: v.name,
    accent: v.labels.accent,
    description: v.labels.description,
    age: v.labels.age,
    gender: v.labels.gender,
    preview: v.preview_url,
    downloaded: 'no', // You might want to update this based on actual data
    generated: gen[index],
  }));

  // Sort the array of voice objects by name
  vox.sort((a, b) => (a.name < b.name ? -1 : 1));

  // Render the voices template
  res.render('voices.njk', {
    vox,
    page: 'Voices',
    caller: 'voices',
    scr1,
  });
};

module.exports = { voicesHandler };
