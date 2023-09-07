const express=require('express');
const router = express.Router();

const {buildShowreelHandler} = require('../handlers/build-showreel-handler');

router.get('/', buildShowreelHandler);

module.exports = router;