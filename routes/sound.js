const express=require('express');
const router = express.Router();

const {soundHandler} = require('../handlers/showreel/sound-handler');

router.get('/', soundHandler);

module.exports = router;