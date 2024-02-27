const express=require('express');
const router = express.Router();
const {generateSceneHandler} = require('../handlers/showreel/generate-scene-handler');
router.get('/', generateSceneHandler);
module.exports = router;