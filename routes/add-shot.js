const express=require('express');
const router = express.Router();
const {addShotHandler} = require('../handlers/add-shot-handler');
router.get('/', addShotHandler);
module.exports = router;