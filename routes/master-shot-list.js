const express=require('express');
const router = express.Router();
const {masterShotListHandler} = require('../handlers/master-shot-list-handler');
router.get('/', masterShotListHandler);
module.exports = router;