"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const {generateSample } = require('../services/elevenLabs');
const dotenv = require("dotenv");
dotenv.config();

const getSamplesHandler = async (req, res) => {
  smartLog("info", "ENTERING GET SAMPLES HANDLER");
  const u = url.parse(req.originalUrl, true);
  const voice_id = u.query.voice_id;

  generateSample(voice_id, process.env.APIKEY)

  setTimeout(function () {
    res.redirect('/voices');
  }, 3000);
};

module.exports = { getSamplesHandler };
