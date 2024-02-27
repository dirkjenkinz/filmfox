const express=require('express');
const router = express.Router();
const {addCharacterToSceneHandler} = require('../handlers/showreel/add-character-to-scene-handler');
router.get('/', addCharacterToSceneHandler);
module.exports = router;