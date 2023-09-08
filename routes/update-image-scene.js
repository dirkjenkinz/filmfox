const express=require('express');
const router = express.Router();

const {updateImageSceneHandler} = require('../handlers/update-image-scene-handler');

router.get('/', updateImageSceneHandler);

module.exports = router;