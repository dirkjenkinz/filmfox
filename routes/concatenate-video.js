const express=require('express');
const router = express.Router();
const {concatenateVideoHandler} = require('../handlers/concatenate-video-handler');
router.get('/', concatenateVideoHandler);
module.exports = router;