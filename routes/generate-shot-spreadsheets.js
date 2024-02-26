const express=require('express');
const router = express.Router();
const {generateShotSpreadsheetsHandler} = require('../handlers/paperwork/generate-shot-spreadsheets-handler');
router.get('/', generateShotSpreadsheetsHandler);
module.exports = router;