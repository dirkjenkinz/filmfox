const express=require('express');
const router = express.Router();

const {playMasterHandler} = require('../handlers/play-master-handler');

router.get('/', playMasterHandler);

module.exports = router;