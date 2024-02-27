const express=require('express');
const router = express.Router();

const {videoHandler} = require('../handlers/showreel/video-handler');

router.get('/', videoHandler);

module.exports = router;