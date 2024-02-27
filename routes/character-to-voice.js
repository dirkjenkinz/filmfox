const express=require('express');
const router = express.Router();

const {characterToVoiceHandler} = require('../handlers/showreel/character-to-voice-handler');

router.get('/', characterToVoiceHandler);

module.exports = router;