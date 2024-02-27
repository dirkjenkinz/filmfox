const express=require('express');
const router = express.Router();
const {concatenateVideoHandler} = require('../handlers/showreel/concatenate-video-handler');
router.get('/', concatenateVideoHandler);
module.exports = router;