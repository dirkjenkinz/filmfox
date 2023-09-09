const express=require('express');
const router = express.Router();

const {playShowreelHandler} = require('../handlers/play-showreel-handler');

router.get('/', playShowreelHandler);

module.exports = router;