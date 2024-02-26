const express=require('express');
const router = express.Router();
const {generateSheetSpreadsheetsHandler} = require('../handlers/paperwork/generate-sheet-spreadsheets-handler');
router.get('/', generateSheetSpreadsheetsHandler);
module.exports = router;