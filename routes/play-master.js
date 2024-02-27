const express=require('express');
const router = express.Router();

const {playMasterHandler} = require('../handlers/showreel/play-master-handler');

router.get('/', playMasterHandler);

module.exports = router;