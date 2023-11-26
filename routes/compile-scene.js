const express=require('express');
const router = express.Router();
const {compileSceneHandler} = require('../handlers/compile-scene-handler');
router.get('/', compileSceneHandler);
module.exports = router;