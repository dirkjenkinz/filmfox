const express=require('express');
const router = express.Router();

const {breakdownPDFHandler} = require('../handlers/breakdown-pdf-handler');

router.get('/', breakdownPDFHandler);

module.exports = router;