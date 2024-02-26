const express=require('express');
const router = express.Router();
const {generateCategorySpreadsheetsHandler} = require('../handlers/paperwork/generate-category-spreadsheets-handler');
router.get('/', generateCategorySpreadsheetsHandler);
module.exports = router;