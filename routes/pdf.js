const express=require('express');
const router = express.Router();
const {pdfHandler} = require('../handlers/pdf-handler');
router.get('/', pdfHandler);
module.exports = router;