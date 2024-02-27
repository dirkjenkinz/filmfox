const express=require('express');
const router = express.Router();
const {sceneArrangerHandler} = require('../handlers/paperwork/scene-arranger-handler');
router.get('/', sceneArrangerHandler);
module.exports = router;