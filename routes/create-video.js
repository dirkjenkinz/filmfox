const express=require('express');
const router = express.Router();
const {createVideoHandler} = require('../handlers/showreel/create-video-handler');
router.get('/', createVideoHandler);
module.exports = router;