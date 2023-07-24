const express=require('express');
const router = express.Router();

const {srtHandler} = require('../handlers/srt-handler');

router.get('/', srtHandler);

module.exports = router;