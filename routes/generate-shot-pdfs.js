const express=require('express');
const router = express.Router();
const {generateShotPDFsHandler} = require('../handlers/paperwork/generate-shot-pdfs-handler');
router.get('/', generateShotPDFsHandler);
module.exports = router;