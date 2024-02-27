const express=require('express');
const router = express.Router();
const {deleteShotHandler} = require('../handlers/showreel/delete-shot-handler');
router.get('/', deleteShotHandler);
module.exports = router;