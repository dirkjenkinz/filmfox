const express=require('express');
const router = express.Router();

const {characterToVoiceHandler} = require('../services/handlers/character-to-voice-handler');

router.get('/', characterToVoiceHandler);

module.exports = router;