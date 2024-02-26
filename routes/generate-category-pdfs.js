const express=require('express');
const router = express.Router();
const {generateCategoryPDFsHandler} = require('../handlers/paperwork/generate-category-pdfs-handler');
router.get('/', generateCategoryPDFsHandler);
module.exports = router;