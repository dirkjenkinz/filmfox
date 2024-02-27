const express=require('express');
const router = express.Router();
const {addShotHandler} = require('../handlers/paperwork/add-shot-handler');
router.get('/', addShotHandler);
module.exports = router;