const express=require('express');
const router = express.Router();

const {concatenateSoundHandler} = require('../handlers/showreel/concatenate-sound-handler');

router.get('/', concatenateSoundHandler);

module.exports = router;