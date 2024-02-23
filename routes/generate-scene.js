const express=require('express');
const router = express.Router();
const {generateSceneHandler} = require('../handlers/generate-scene-handler');
router.get('/', generateSceneHandler);
module.exports = router;