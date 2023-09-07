const express=require('express');
const router = express.Router();

const {runShowreelHandler} = require('../handlers/run-showreel-handler');

router.get('/', runShowreelHandler);

module.exports = router;