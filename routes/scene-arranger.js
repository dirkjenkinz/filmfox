const express=require('express');
const router = express.Router();
const {sceneArrangerHandler} = require('../handlers/scene-arranger-handler');
router.get('/', sceneArrangerHandler);
module.exports = router;