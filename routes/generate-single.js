const express=require('express');
const router = express.Router();

const {generateSingleHandler} = require('../handlers/showreel/generate-single-handler');

router.get('/', generateSingleHandler);

module.exports = router;