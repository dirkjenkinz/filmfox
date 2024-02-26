const express=require('express');
const router = express.Router();
const {generateSheetPDFsHandler} = require('../handlers/paperwork/generate-sheet-pdfs-handler');
router.get('/', generateSheetPDFsHandler);
module.exports = router;