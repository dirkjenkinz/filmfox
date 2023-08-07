const express=require('express');
const router = express.Router();

const {playHandler} = require('../handlers/play-handler');

router.get('/', playHandler);

module.exports = router;