const express=require('express');
const router = express.Router();
const {fullShotListHandler} = require('../handlers/showreel/full-shot-list-handler');
router.get('/', fullShotListHandler);
module.exports = router;